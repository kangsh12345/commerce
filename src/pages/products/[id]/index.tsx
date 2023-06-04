import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Button } from '@mantine/core';
import { Cart, OrderItem, products } from '@prisma/client';
import {
  IconHeart,
  IconHeartbeat,
  IconShoppingCart,
} from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { convertFromRaw, EditorState } from 'draft-js';
import Carousel from 'nuka-carousel';

import { CountControl } from '~/components/CountControl/CountControl';
import { CustomEditor } from '~/components/Editor/Editor';
import { CarouselImage } from '~/components/Image/CarouselImage';
import { CATEGORY_MAP } from '~/constants/products';
import { CART_QUERY_KEY } from '~/pages/cart';
import { ORDER_QUERY_KEY } from '~/pages/my';

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
  const product = props.product;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: productId } = router.query;

  const [index, setIndex] = useState(0);
  const [value, setValue] = useState<number | ''>(1);
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

  const { mutate: addCart } = useMutation<
    unknown,
    unknown,
    Omit<Cart, 'id' | 'userId'>,
    any
  >(
    item =>
      fetch('/api/add-cart', {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then(res => res.json())
        .then(data => data.items),
    {
      onMutate: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
      },
      onSuccess: () => {
        router.push('/cart');
      },
    },
  );

  const { mutate: addOrder } = useMutation<
    unknown,
    unknown,
    Array<Omit<OrderItem, 'id'>>,
    any
  >(
    items =>
      fetch('/api/add-order', {
        method: 'POST',
        body: JSON.stringify({ items }),
      })
        .then(res => res.json())
        .then(data => data.items),
    {
      onMutate: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY]);
      },
      onSuccess: () => {
        router.push('/my');
      },
    },
  );

  const validate = (type: 'cart' | 'order') => {
    if (value == '') {
      alert('최소 수량을 선택하세요.');
      return;
    }

    if (type === 'cart') {
      addCart({
        productId: product.id,
        quantity: value,
        amount: product.price * value,
      });
    } else if (type === 'order') {
      addOrder([
        {
          productId: product.id,
          quantity: value,
          price: product.price,
          amount: product.price * value,
        },
      ]);
    }
  };

  const isWished =
    wishlist != null && productId != null
      ? wishlist.includes(String(productId))
      : false;

  return (
    <>
      {product != null && productId != null ? (
        <div className="flex flex-row">
          <div>
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-4 mt-6 justify-center">
                {product.images.map((url, idx) => (
                  <div
                    key={`url-thumb-${idx}`}
                    onClick={() => {
                      setIndex(idx);
                    }}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      height: '165px',
                      width: '155px',
                    }}
                  >
                    <Image
                      src={url}
                      alt="image"
                      fill
                      style={{
                        objectFit: 'cover',
                        backgroundPosition: '50% 50%',
                      }}
                    />
                  </div>
                ))}
              </div>

              <Carousel
                animation="fade"
                withoutControls
                wrapAround
                autoplayInterval={3000}
                slideIndex={index}
                className="max-w-[calc(100vw-818px)]"
              >
                {product.images.map((url, idx) => (
                  <div
                    key={`url-carousel-${idx}`}
                    className="flex justify-center"
                  >
                    <CarouselImage url={url} />
                  </div>
                ))}
              </Carousel>
            </div>
            {editorState != null && (
              <div className="flex justify-center">
                <div className="basis-[800px]">
                  <CustomEditor editorState={editorState} readOnly={true} />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-6 basis-[360px] ml-24">
            <div className="text-lg text-zinc-400">
              {CATEGORY_MAP[product.category_id - 1]}
            </div>
            <div className="text-4xl font-semibold">{product.name}</div>
            <div className="text-lg">
              {product.price.toLocaleString('ko-kr')} 원
            </div>
            <div className="flex flex-col space-y-0.5">
              <span className="text-sm text-zinc-500">수량</span>
              <CountControl
                value={value}
                setValue={setValue}
                min={1}
                max={99}
              />
            </div>
            <div className="flex space-x-4">
              <Button
                leftIcon={<IconShoppingCart size={20} stroke={1.5} />}
                color="dark"
                className={'flex-1'}
                radius="xl"
                size="md"
                styles={{ root: { paddingRight: 14, height: 48 } }}
                onClick={() => {
                  if (session == null) {
                    alert('로그인 필요');
                    router.push('/auth/login');
                    return;
                  }
                  validate('cart');
                }}
              >
                장바구니
              </Button>
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
            </div>
            <Button
              variant="outline"
              color="dark"
              radius="xl"
              size="md"
              styles={{ root: { paddingRight: 14, height: 48 } }}
              onClick={() => {
                if (session == null) {
                  alert('로그인 필요');
                  router.push('/auth/login');
                  return;
                }
                validate('order');
              }}
            >
              구매하기
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
