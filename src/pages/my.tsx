import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Badge, Button } from '@mantine/core';
import { OrderItem, Orders } from '@prisma/client';
import { IconX } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

import { CountControl } from '~/components/CountControl/CountControl';

export const ORDER_QUERY_KEY = '/api/get-order';

export const ORDER_STATUS_MAP = [
  '주문취소',
  '주문대기',
  '결제대기',
  '결제완료',
  '배송대기',
  '배송중',
  '배송완료',
  '환부ᇐ대기',
  '환불완료',
  '반품대기',
  '반품완료',
];

interface OrderItemDetail extends OrderItem {
  name: string;
  image_url: string;
}

interface OrderDetail extends Orders {
  orderItems: OrderItemDetail[];
}

export default function My() {
  const { data, isLoading } = useQuery<
    { items: OrderDetail[] },
    unknown,
    OrderDetail[]
  >({
    queryKey: [ORDER_QUERY_KEY],
    queryFn: () =>
      fetch(ORDER_QUERY_KEY)
        .then(res => res.json())
        .then(data => data.items),
  });

  return (
    <div>
      <span className="text-2xl mb-3">주문내역 {data ? data.length : 0}개</span>
      <div className="flex">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {isLoading ? (
            <div>로딩중...</div>
          ) : data && data.length > 0 ? (
            data.map((item, idx) => <DetailItem key={idx} {...item} />)
          ) : (
            <div>주문내역이 아무것도 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

const DetailItem = (props: OrderDetail) => {
  const queryClient = useQueryClient();

  const { mutate: updateOrderStatus } = useMutation<
    unknown,
    unknown,
    number,
    any
  >(
    status =>
      fetch('/api/update-order-status', {
        method: 'POST',
        body: JSON.stringify({
          id: props.id,
          status: status,
          userId: props.userId,
        }),
      })
        .then(res => res.json())
        .then(data => data.items),
    {
      onMutate: async status => {
        await queryClient.cancelQueries([ORDER_QUERY_KEY]);

        const previous = queryClient.getQueryData([ORDER_QUERY_KEY]);

        queryClient.setQueryData<OrderDetail[]>([ORDER_QUERY_KEY], old =>
          old?.map(c => {
            if (c.id === props.id) {
              return { ...c, status: status };
            }
            return c;
          }),
        );

        return { previous };
      },
      onSuccess: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY]);
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([ORDER_QUERY_KEY], context.previous);
      },
    },
  );

  const handlePayment = () => {
    // 주문상태를 5로 바꿈
    if (props.status !== 5) {
      updateOrderStatus(5);
    }
  };

  const handleCancel = () => {
    //주문상태를 -1로 바꿈
    if (props.status !== -1) {
      updateOrderStatus(-1);
    }
  };

  return (
    <div
      className="w-full flex flex-col p-4 rounded-md"
      style={{ border: '1px solid gray' }}
      onClick={() => console.log(props)}
    >
      <div className="flex">
        <Badge color={props.status === -1 ? 'red' : 'blue'} className="mb-2">
          {ORDER_STATUS_MAP[props.status + 1]}
        </Badge>
        <IconX className="ml-auto" onClick={handleCancel} />
      </div>
      {props.orderItems?.map((orderItem, idx) => (
        <Item key={idx} {...orderItem} />
      ))}
      <div className="flex mt-4">
        <div className="flex flex-col space-y-2">
          <span className="mb-2 text-zinc-400">주문내용</span>
          <span>받는사람: {props.receiver ?? '입력필요'}</span>
          <span>주소: {props.address ?? '입력필요'}</span>
          <span>연락처: {props.phoneNumber ?? '입력필요'}</span>
        </div>
        <div className="flex flex-col ml-auto mr-4 text-right">
          <span className="mb-2 font-semibold">
            합계 금액:{' '}
            <span className="text-red-500">
              {props.orderItems
                .map(item => item.amount)
                .reduce((prev, curr) => prev + curr, 0)
                .toLocaleString('ko-kr')}
              원
            </span>
          </span>
          <span className="text-zinc-400 mt-auto mb-auto">
            주문일자:{' '}
            {format(new Date(props.createdAt), 'yyyy년 M월 d일 HH:mm:ss')}
          </span>
          <Button color="dark" onClick={handlePayment}>
            결제 처리
          </Button>
        </div>
      </div>
    </div>
  );
};

const Item = (props: OrderItemDetail) => {
  const router = useRouter();

  const [quantity, setQuantity] = useState<number | ''>(props.quantity);
  const [amount, setAmount] = useState<number>(props.quantity);

  useEffect(() => {
    if (quantity != '') {
      setAmount(quantity * props.price);
    }
  }, [quantity, props.price]);

  return (
    <div className="flex p-4" style={{ borderBottom: '1px solid gray' }}>
      <Image
        src={props.image_url}
        width={155}
        height={195}
        alt={props.name}
        onClick={() => router.push(`products/${props.productId}`)}
      />
      <div className="flex flex-col ml-4">
        <span className="font-semibold mb-2">{props.name}</span>
        <span className="mb-auto">
          가격: {props.price.toLocaleString('ko-kr')} 원
        </span>
        <div className="flex items-center space-x-4">
          <CountControl
            value={quantity}
            setValue={setQuantity}
            min={1}
            max={99}
            disabled={true}
          />
        </div>
      </div>
      <div className="flex ml-auto space-x-4">
        <span>{amount.toLocaleString('ko-kr')} 원</span>
      </div>
    </div>
  );
};
