import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Button } from '@mantine/core';
import { Cart, products } from '@prisma/client';
import { IconRefresh, IconX } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CountControl } from '~/components/CountControl/CountControl';
import { CATEGORY_MAP } from '~/constants/products';

interface CartItem extends Cart {
  name: string;
  price: number;
  image_url: string;
}

const CART_QUERY_KEY = '/api/get-cart';

export default function CartPage() {
  const router = useRouter();

  const { data, isLoading } = useQuery<
    { items: CartItem[] },
    unknown,
    CartItem[]
  >({
    queryKey: [CART_QUERY_KEY],
    queryFn: () =>
      fetch(CART_QUERY_KEY)
        .then(res => res.json())
        .then(data => data.items),
  });

  const deliveryAmount = data && data.length > 0 ? 5000 : 0;
  const discountAmount = 0;

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >({
    queryKey: [`/api/get-products?skip=1&take=$3`],
    queryFn: () =>
      fetch(`/api/get-products?skip=1&take=3`).then(res => res.json()),
    select: data => data.items,
  });

  const amount = useMemo(() => {
    if (data == null) {
      return 0;
    }
    return data.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
  }, [data]);

  const handleOrder = () => {
    //TODO: 주문하기 기능 구현
    alert(`장바구니에 담긴 것들 ${JSON.stringify(data)} 주문`);
  };

  return (
    <div>
      <span className="text-2xl mb-3">장바구니 {data ? data.length : 0}개</span>
      <div className="flex">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {isLoading ? (
            <div>로딩중...</div>
          ) : data && data.length > 0 ? (
            data.map((item, idx) => <Item key={idx} {...item} />)
          ) : (
            <div>장바구니에 아무것도 없습니다.</div>
          )}
        </div>
        <div className="px-4">
          <div
            className="flex flex-col p-4 space-y-4"
            style={{ minWidth: 300, border: '1px solid gray' }}
          >
            <Row>
              <span>금액</span>
              <span>{amount.toLocaleString('ko-kr')} 원</span>
            </Row>
            <Row>
              <span>배송비</span>
              <span>{deliveryAmount.toLocaleString('ko-kr')} 원</span>
            </Row>
            <Row>
              <span>할인 금액</span>
              <span>{discountAmount.toLocaleString('ko-kr')} 원</span>
            </Row>
            <Row>
              <span className="font-semibold">결제 금액</span>
              <span className="font-semibold text-red-500">
                {(amount + deliveryAmount - discountAmount).toLocaleString(
                  'ko-kr',
                )}{' '}
                원
              </span>
            </Row>

            <Button
              className={'bg-black hover:bg-gray-950'}
              radius="xl"
              size="md"
              styles={{ root: { height: 48 } }}
              onClick={handleOrder}
            >
              구매하기
            </Button>
          </div>
        </div>
      </div>
      <div className="my-32 space-y-4">
        <p>추천상품</p>
        <div className="grid grid-cols-12 gap-10">
          {products &&
            products.map(item => (
              <div
                key={item.id}
                className="md:col-span-6 lg:col-span-4 col-span-12"
                onClick={() => router.push(`/products/${item.id}`)}
              >
                <div className="rounded shadow-lg flex flex-col break-word">
                  <div className="relative pb-[100%] overflow-hidden">
                    <Image
                      className="rounded hover:scale-110 duration-300"
                      src={item.image_url ?? ''}
                      alt={item.name}
                      fill
                      style={{
                        objectFit: 'cover',
                        overflow: 'hidden',
                        backgroundPosition: '50% 50%',
                      }}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8WA8AAicBUm5VYI8AAAAASUVORK5CYII="
                    />
                  </div>
                  <div>
                    <div className="flex">
                      <span>{item.name}</span>
                      <span className="ml-auto">
                        {item.price.toLocaleString('ko-KR')}원
                      </span>
                    </div>
                    <span className="text-zinc-400">
                      {CATEGORY_MAP[item.category_id - 1]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const Item = (props: CartItem) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [quantity, setQuantity] = useState<number | ''>(props.quantity);
  const [amount, setAmount] = useState<number>(props.quantity);

  useEffect(() => {
    if (quantity != '') {
      setAmount(quantity * props.price);
    }
  }, [quantity, props.price]);

  const { mutate } = useMutation<unknown, unknown, Cart, any>(
    item =>
      fetch('/api/update-cart', {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then(res => res.json())
        .then(data => data.items),
    {
      onMutate: async item => {
        await queryClient.cancelQueries([CART_QUERY_KEY]);

        const previous = queryClient.getQueryData([CART_QUERY_KEY]);

        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], old =>
          old?.filter(c => c.id !== item.id).concat(item),
        );

        return { previous };
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([CART_QUERY_KEY], context.previous);
      },
    },
  );

  const handleUpdate = () => {
    //TODO: 장바구니에서 삭제 기능 구현
    if (quantity === '') {
      alert('최소 수량을 선택하세요.');
      return;
    }
    mutate({ ...props, quantity: quantity, amount: props.price * quantity });
  };

  const handleDelete = () => {
    //TODO: 장바구니에서 삭제 기능 구현
    alert(`장바구니에서 ${props.name} 삭제`);
  };

  return (
    <div className="w-full flex p-4" style={{ borderBottom: '1px solid gray' }}>
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
          />
          <IconRefresh onClick={handleUpdate} />
        </div>
      </div>
      <div className="flex ml-auto space-x-4">
        <span>{amount.toLocaleString('ko-kr')} 원</span>
        <IconX onClick={handleDelete} />
      </div>
    </div>
  );
};

const Row = styled.div`
  display: flex;
  * ~ * {
    margin-left: auto;
  }
`;
