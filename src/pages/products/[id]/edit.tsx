import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import Carousel from 'nuka-carousel';

import { CustomEditor } from '~/components/Editor/Editor';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
    thumbnail:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
  },
  {
    original:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/3.jpg',
    thumbnail:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/3.jpg',
  },
  {
    original:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/2.jpg',
    thumbnail:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/2.jpg',
  },
  {
    original:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/1.jpg',
    thumbnail:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/1.jpg',
  },
];

export default function Products() {
  const [index, setIndex] = useState(0);
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined,
  );
  const router = useRouter();
  const { id: productId } = router.query;

  useEffect(() => {
    if (productId != null) {
      fetch(`/api/get-product?id=${productId}`)
        .then(res => res.json())
        .then(data => {
          console.log(data.items);
          if (data.items?.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents)),
              ),
            );
          } else {
            setEditorState(EditorState.createEmpty());
          }
        });
    }
  }, [productId]);

  const handleSave = () => {
    if (editorState) {
      fetch('/api/update-product', {
        method: 'POST',
        body: JSON.stringify({
          id: productId,
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent()),
          ),
        }),
      })
        .then(res => res.json())
        .then(() => {
          alert('Success');
        });
    }
  };

  return (
    <>
      <Carousel
        animation="fade"
        // autoplay
        withoutControls
        wrapAround
        // speed={10}
        autoplayInterval={3000}
        slideIndex={index}
      >
        {images.map(item => (
          <Image
            key={item.original}
            src={item.original}
            alt="image"
            width={1000}
            height={600}
            style={{ width: '100%', height: '100%' }}
          />
        ))}
      </Carousel>
      <div style={{ display: 'flex' }}>
        {images.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              setIndex(idx);
            }}
          >
            <Image
              src={item.original}
              alt="image"
              width={100}
              height={60}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ))}
      </div>
      {editorState != null && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
    </>
  );
}
