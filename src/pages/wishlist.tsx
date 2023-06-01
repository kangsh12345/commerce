import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { products } from '@prisma/client';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CATEGORY_MAP } from '~/constants/products';

const WISHLIST_PRODUCTS_QUERY_KEY = `/api/get-wishlist-products`;
const WISHLIST_QUERY_KEY = '/api/get-wishlist';

export default function Wishlist() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >({
    queryKey: [WISHLIST_PRODUCTS_QUERY_KEY],
    queryFn: () => fetch(WISHLIST_PRODUCTS_QUERY_KEY).then(res => res.json()),
    select: data => data.items,
  });

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

  return (
    <div>
      <span className="text-2xl mb-3">관심목록</span>
      <div className="grid grid-cols-12 gap-10 p-4">
        {products &&
          products.map(item => (
            <div
              key={item.id}
              className="md:col-span-6 lg:col-span-4 col-span-12"
            >
              <div className="relative">
                <div
                  className="absolute z-10 p-2.5 right-0 cursor-pointer"
                  onClick={() => {
                    if (session == null) {
                      alert('로그인 필요');
                      router.push('/auth/login');
                      return;
                    } else {
                      mutate(String(item.id));
                    }
                  }}
                >
                  {wishlist != null &&
                  item.id !== null &&
                  wishlist.includes(String(item.id)) ? (
                    <IconHeartFilled size={26} className="text-red-500" />
                  ) : (
                    <IconHeart size={26} className="text-gray-500" />
                  )}
                </div>
                <div
                  className="rounded shadow-lg flex flex-col break-word"
                  onClick={() => router.push(`/products/${item.id}`)}
                >
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
            </div>
          ))}
      </div>
    </div>
  );
}
