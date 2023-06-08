import Image from 'next/image';
import { useRouter } from 'next/router';
import { Rating } from '@mantine/core';
import { Comment, OrderItem } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { convertFromRaw, EditorState } from 'draft-js';

import { CustomEditor } from '~/components/Editor/Editor';

export const ORDERANDCOMMENT_QUERY_KEY = '/api/get-my-comments';

interface OrderAndCommentDetail {
  comment: Comment;
  info: OrderItemDetail;
}

interface OrderItemDetail extends OrderItem {
  name: string;
  image_url: string;
}

export default function Comments() {
  const { data, isLoading } = useQuery<
    { items: OrderAndCommentDetail[] },
    unknown,
    OrderAndCommentDetail[]
  >({
    queryKey: [ORDERANDCOMMENT_QUERY_KEY],
    queryFn: () =>
      fetch(ORDERANDCOMMENT_QUERY_KEY)
        .then(res => res.json())
        .then(data => data.items),
  });

  return (
    <div>
      <span className="text-2xl mb-3">내 후기 {data ? data.length : 0}개</span>
      <div className="flex">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {isLoading ? (
            <div>로딩중...</div>
          ) : data && data.length > 0 ? (
            data.map((item, idx) => <DetailItem key={idx} {...item} />)
          ) : (
            <div>후기가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

const DetailItem = (props: OrderAndCommentDetail) => {
  const router = useRouter();

  return (
    <div
      className="w-full flex flex-col p-4 rounded-md"
      style={{ border: '1px solid gray' }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-semibold">{props.info.name}</span>
          <span className="text-zinc-300 text-xs">
            {props.info.price.toLocaleString('ko-kr')} 원 *{' '}
            {props.info.quantity} 개 ={' '}
            {props.info.amount.toLocaleString('ko-kr')} 원
          </span>
        </div>
        <p className="text-zinc-500 ml-auto">
          {format(
            new Date(props.comment.updatedAt),
            '작성일자: yyyy년 M월 d일',
          )}
        </p>
      </div>
      <div className="flex p-4">
        <Image
          src={props.info.image_url}
          width={155}
          height={195}
          alt={props.info.name}
          onClick={() => router.push(`/products/${props.info.productId}`)}
        />
        <div className="flex flex-1 flex-col ml-4 flex-wrap">
          <Rating value={props.comment.rate} color="red" readOnly />
          <CustomEditor
            editorState={EditorState.createWithContent(
              convertFromRaw(JSON.parse(props.comment.contents ?? '')),
            )}
            readOnly
            noPadding
          />
        </div>
      </div>
    </div>
  );
};
