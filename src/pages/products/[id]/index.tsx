import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { products } from '@prisma/client';
import { format } from 'date-fns';
import { convertFromRaw, EditorState } from 'draft-js';
import Carousel from 'nuka-carousel';

import { CustomEditor } from '~/components/Editor/Editor';
import { CATEGORY_MAP } from '~/constants/products';

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const product = await fetch(
    `http://localhost:3000/api/get-product?id=${params?.id}`,
  )
    .then(res => res.json())
    .then(data => data.items);
  return {
    props: {
      product: { ...product, images: [product.image_url, product.image_url] },
    },
  };
}

export default function Products(props: {
  product: products & { images: string[] };
}) {
  const router = useRouter();
  const { id: productId } = router.query;

  const [index, setIndex] = useState(0);
  const [editorState] = useState<EditorState | undefined>(() =>
    props.product.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents)),
        )
      : EditorState.createEmpty(),
  );

  const product = props.product;

  return (
    <>
      {product != null && productId != null ? (
        <div className="p-24 flex flex-row">
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
