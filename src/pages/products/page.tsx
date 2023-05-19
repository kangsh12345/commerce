import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Pagination, SegmentedControl } from '@mantine/core';
import { categories, products } from '@prisma/client';

import { CATEGORY_MAP, TAKE } from '~/constants/products';

export default function Products() {
  const [products, setProducts] = useState<products[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<categories[]>([]);
  const [activePage, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('-1');

  useEffect(() => {
    fetch(`/api/get-categories`)
      .then(res => res.json())
      .then(data => setCategories(data.items));
  }, []);

  useEffect(() => {
    fetch(`/api/get-products-count?category=${selectedCategory}`)
      .then(res => res.json())
      .then(data => {
        setPage(1);
        setTotal(Math.ceil(data.items / TAKE));
      });
  }, [selectedCategory]);

  useEffect(() => {
    const skip = TAKE * (activePage - 1);

    fetch(
      `/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}`,
    )
      .then(res => res.json())
      .then(data => setProducts(data.items));
  }, [activePage, selectedCategory]);

  return (
    <div className="px-36 mt-36">
      {categories && (
        <div className="mb-4">
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
        </div>
      )}
      {products && (
        // <div className="flex flex-wrap justify-center">
        <div className="grid grid-cols-3 gap-5">
          {products.map(item => (
            <div key={item.id}>
              <div style={{ width: 310 }}>
                <div style={{ position: 'relative', width: 310, height: 390 }}>
                  <Image
                    className="rounded"
                    src={item.image_url ?? ''}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover', overflow: 'hidden' }}
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
      )}
      <div className="w-full flex mt-10 mb-20">
        <Pagination
          className="m-auto"
          value={activePage}
          onChange={setPage}
          total={total}
        />
      </div>
    </div>
  );
}
