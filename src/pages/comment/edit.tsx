import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Rating } from '@mantine/core';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

import { CustomEditor } from '~/components/Editor/Editor';

export default function CommentEdit() {
  const router = useRouter();
  const { orderItemId } = router.query;

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
          images: [],
        }),
      })
        .then(res => res.json())
        .then(() => {
          alert('Success');
          router.back();
        });
    }
  };

  return (
    <div>
      <Rating className="pb-2 pl-1" value={rate} onChange={setRate} />
      {editorState != null && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
