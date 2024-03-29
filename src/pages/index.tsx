import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Input, Pagination, SegmentedControl, Select } from '@mantine/core';
import { categories, products } from '@prisma/client';
import { IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

import { CATEGORY_MAP, FILTERS, TAKE } from '~/constants/products';
import useDebounce from '~/hooks/useDebounce';

export default function Home() {
  const router = useRouter();

  const [activePage, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('-1');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    FILTERS[0].value,
  );
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce<string>(keyword);

  const { data: categories } = useQuery<
    { items: categories[] },
    unknown,
    categories[]
  >({
    queryKey: [`/api/get-categories`],
    queryFn: () => fetch(`/api/get-categories`).then(res => res.json()),
    select: data => data.items,
  });

  const { data: total } = useQuery<{ items: number }, Error, number>({
    queryKey: [
      `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`,
    ],
    queryFn: () =>
      fetch(
        `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`,
      ).then(res => res.json()),
    select: data => Math.ceil(data.items / TAKE),
  });

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, selectedFilter, debouncedKeyword]);

  const { data: products, isLoading: productsIsLoading } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >({
    queryKey: [
      `/api/get-products?skip=${
        TAKE * (activePage - 1)
      }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`,
    ],
    queryFn: () =>
      fetch(
        `/api/get-products?skip=${
          TAKE * (activePage - 1)
        }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`,
      ).then(res => res.json()),
    select: data => data.items,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
      <div className="mb-4 mt-24">
        <Input
          icon={<IconSearch />}
          placeholder="검색어를 입력해주세요."
          value={keyword}
          onChange={handleSearch}
          radius="md"
          size="md"
        />
      </div>
      <div className="flex justify-between mb-4 flex-wrap gap-2">
        {categories && (
          <SegmentedControl
            value={selectedCategory}
            onChange={setSelectedCategory}
            data={[
              { label: 'ALL', value: '-1' },
              ...categories.map(category => ({
                label: category.name,
                value: String(category.id),
              })),
            ]}
            color="dark"
          />
        )}
        <Select
          value={selectedFilter}
          onChange={setSelectedFilter}
          data={FILTERS}
        />
      </div>
      {productsIsLoading ? (
        <>로딩중</>
      ) : products && products.length !== 0 ? (
        <>
          <div className="grid grid-cols-12 gap-10">
            {products.map(item => (
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

          <div className="w-full flex mt-10 mb-20">
            <Pagination
              className="m-auto"
              value={activePage}
              onChange={setPage}
              total={total ?? 1}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-12">해당하는 상품이 없습니다.</div>
      )}
    </div>
  );
}
