import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Rating } from '@mantine/core';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

import { AutoSizeImage } from '~/components/AutoSizeImage/AutoSizeImage';
import { CustomEditor } from '~/components/Editor/Editor';

export default function CommentEdit() {
  const router = useRouter();
  const { orderItemId } = router.query;

  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined,
  );
  const [rate, setRate] = useState(0);

  useEffect(() => {
    if (orderItemId != null) {
      fetch(`/api/get-comment?id=${orderItemId}`)
        .then(res => res.json())
        .then(data => {
          if (data.items?.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents)),
              ),
            );
            setRate(data.items.rate);
            setImages(data.items.images.split(',') ?? []);
          } else {
            setEditorState(EditorState.createEmpty());
          }
        });
    }
  }, [orderItemId]);

  const handleSave = () => {
    if (editorState) {
      fetch('/api/update-comment', {
        method: 'POST',
        body: JSON.stringify({
          orderItemId: Number(orderItemId),
          rate: rate,
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent()),
          ),
          images: images.join(','),
        }),
      })
        .then(res => res.json())
        .then(() => {
          alert('Success');
          router.back();
        });
    }
  };

  const handleChange = () => {
    if (
      inputRef.current &&
      inputRef.current.files &&
      inputRef.current.files.length > 0
    ) {
      for (let i = 0; i < inputRef.current.files.length; i++) {
        const fd = new FormData();

        fd.append(
          'image',
          inputRef.current.files[i],
          inputRef.current.files[i].name,
        );

        fetch(
          'https://api.imgbb.com/1/upload?key=9e3b8740723914b4e53305afd96dd058',
          { method: 'POST', body: fd },
        )
          .then(res => res.json())
          .then(data => {
            console.log(data);

            setImages((prev: string[]) =>
              Array.from(new Set(prev.concat(data.data.image.url))),
            );
          })
          .catch(err => console.log(err));
      }
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <Rating className="pl-1" value={rate} onChange={setRate} color="red" />
      {editorState != null && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
      />
      <div className="flex">
        {images &&
          images.length > 0 &&
          images.map((image, idx) => <AutoSizeImage key={idx} src={image} />)}
      </div>
    </div>
  );
}
