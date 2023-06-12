import { Rating } from '@mantine/core';
import { format } from 'date-fns';
import { convertFromRaw, EditorState } from 'draft-js';

import { CommentItemType } from '~/pages/products/[id]';

import { AutoSizeImage } from '../AutoSizeImage/AutoSizeImage';
import { CustomEditor } from '../Editor/Editor';

export function CommentItem({ item }: { item: CommentItemType }) {
  return (
    <div className="border border-solid border-black rounded-md p-2">
      <div className="flex">
        <div className="flex flex-col space-y-1">
          <div className="flex">
            <Rating value={item.rate} color="red" readOnly />
          </div>
          <span className="text-zinc-300 text-xs">
            {item.price.toLocaleString('ko-kr')} 원 * {item.quantity} 개 ={' '}
            {item.amount.toLocaleString('ko-kr')} 원
          </span>
        </div>
        <p className="text-zinc-500 ml-auto">
          {format(new Date(item.updatedAt), 'yyyy년 M월 d일')}
        </p>
      </div>
      <CustomEditor
        editorState={EditorState.createWithContent(
          convertFromRaw(JSON.parse(item.contents ?? '')),
        )}
        readOnly
        noPadding
      />
      <div className="flex flex-col items-center space-y-3">
        {item.images?.split(',').map((image, idx) => (
          <AutoSizeImage key={idx} src={image} size={300} />
        ))}
      </div>
    </div>
  );
}
