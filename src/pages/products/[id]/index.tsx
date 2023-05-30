import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Button } from '@mantine/core';
import { products } from '@prisma/client';
import { IconHeart, IconHeartbeat } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { convertFromRaw, EditorState } from 'draft-js';
import Carousel from 'nuka-carousel';

import { CustomEditor } from '~/components/Editor/Editor';
import { CATEGORY_MAP } from '~/constants/products';

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const product = await fetch(
    `http://127.0.0.1:3000//api/get-product?id=${params?.id}`,
  )
    .then(res => res.json())
    .then(data => data.items);
  return {
    props: {
      product: { ...product, images: [product.image_url, product.image_url] },
    },
  };
}

const WISHLIST_QUERY_KEY = '/api/get-wishlist';

export default function Products(props: {
  product: products & { images: string[] };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: productId } = router.query;

  const [index, setIndex] = useState(0);
  const { data: session } = useSession();
  const [editorState] = useState<EditorState | undefined>(() =>
    props.product.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents)),
        )
      : EditorState.createEmpty(),
  );

  const { data: wishlist } = useQuery({
    queryKey: [WISHLIST_QUERY_KEY],
    queryFn: () =>
      fetch(WISHLIST_QUERY_KEY)
        .then(res => res.json())
        .then(data => data.items),
  });

  const { mutate } = useMutation<unknown, unknown, string, any>(
    productId =>
      fetch('/api/update-wishlist', {
        method: 'POST',
        body: JSON.stringify({ productId }),
      })
        .then(res => res.json())
        .then(data => data.items),
    {
      onMutate: async productId => {
        await queryClient.cancelQueries([WISHLIST_QUERY_KEY]);

        const previous = queryClient.getQueryData([WISHLIST_QUERY_KEY]);

        queryClient.setQueryData<string[]>([WISHLIST_QUERY_KEY], old =>
          old
            ? old.includes(String(productId))
              ? old.filter(id => id !== String(productId))
              : old.concat(String(productId))
            : [],
        );

        return () => queryClient.setQueryData([WISHLIST_QUERY_KEY], previous);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([WISHLIST_QUERY_KEY]);
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([WISHLIST_QUERY_KEY], context.previous);
      },
    },
  );

  const product = props.product;

  const isWished =
    wishlist != null && productId != null
      ? wishlist.includes(String(productId))
      : false;

  return (
    <>
      {product != null && productId != null ? (
        <div className="flex flex-row">
          <div className="max-w-600 mr-52">
            <Carousel
              animation="fade"
              // autoplay
              withoutControls
              wrapAround
              // speed={10}
              autoplayInterval={3000}
              slideIndex={index}
            >
              {product.images.map((url, idx) => (
                <Image
                  key={`url-carousel-${idx}`}
                  src={url}
                  alt="image"
                  width={600}
                  height={600}
                  style={{ width: '100%', height: '100%' }}
                />
              ))}
            </Carousel>
            <div className="flex space-x-4 mt-2">
              {product.images.map((url, idx) => (
                <div
                  key={`url-thumb-${idx}`}
                  onClick={() => {
                    setIndex(idx);
                  }}
                >
                  <Image
                    src={url}
                    alt="image"
                    width={100}
                    height={100}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              ))}
            </div>
            {editorState != null && (
              <CustomEditor editorState={editorState} readOnly={true} />
            )}
          </div>
          <div className="max-w-600 flex flex-col space-y-6">
            <div className="text-lg text-zinc-400">
              {CATEGORY_MAP[product.category_id - 1]}
            </div>
            <div className="text-4xl font-semibold">{product.name}</div>
            <div className="text-lg">
              {product.price.toLocaleString('ko-kr')} 원
            </div>
            <>{wishlist}</>
            <Button
              disabled={wishlist == null}
              leftIcon={
                isWished ? (
                  <IconHeartbeat size={20} stroke={1.5} />
                ) : (
                  <IconHeart size={20} stroke={1.5} />
                )
              }
              className={`${
                isWished
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gray-500 hover:bg-gray-600'
              }`}
              radius="xl"
              size="md"
              styles={{ root: { paddingRight: 14, height: 48 } }}
              onClick={() => {
                if (session == null) {
                  alert('로그인 필요');
                  router.push('/auth/login');
                  return;
                }
                mutate(String(productId));
              }}
            >
              찜하기
            </Button>
            <div className="text-sm text-zinc-300">
              등록: {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
            </div>
          </div>
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}
