import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Pagination } from '@mantine/core';
import { products } from '@prisma/client';

import { CATEGORY_MAP, TAKE } from '~/constants/products';

export default function Products() {
  const [products, setProducts] = useState<products[]>([]);
  const [total, setTotal] = useState(0);
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    fetch(`/api/get-products-count`)
      .then(res => res.json())
      .then(data => setTotal(Math.ceil(data.items / TAKE)));
    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then(res => res.json())
      .then(data => setProducts(data.items));
  }, []);

  useEffect(() => {
    const skip = TAKE * (activePage - 1);

    fetch(`/api/get-products?skip=${skip}&take=${TAKE}`)
      .then(res => res.json())
      .then(data => setProducts(data.items));
  }, [activePage]);

  return (
    <div className="px-36 mt-36">
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map(item => (
            <div key={item.id} className="flex flex-col justify-between">
              <Image
                className="rounded"
                src={item.image_url ?? ''}
                alt={item.name}
                width={300}
                height={200}
                style={{ width: '100%' }}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8WA8AAicBUm5VYI8AAAAASUVORK5CYII="
              />
              <div>
                <div className="flex">
                  <span>{item.name}</span>
                  <span className="ml-auto">
                    {item.price.toLocaleString('ko-KR')}원
                  </span>
                </div>
                <span className="text-zinc-400">
                  {/* {item.category_id === 1
                    ? '신발'
                    : item.category_id === 2
                    ? '티셔츠'
                    : item.category_id === 3
                    ? '바지'
                    : item.category_id === 4
                    ? '모자'
                    : '후드티'} */}
                  {CATEGORY_MAP[item.category_id]}
                </span>
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
