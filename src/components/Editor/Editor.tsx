import { Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { EditorState } from 'draft-js';
import { EditorProps } from 'react-draft-wysiwyg';

import { Button } from '../Button/Button';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then(module => module.Editor),
  {
    ssr: false,
  },
);

export function CustomEditor({
  editorState,
  readOnly = false,
  onSave,
  onEditorStateChange,
}: {
  editorState: EditorState;
  readOnly?: boolean;
  onSave?: () => void;
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>;
}) {
  return (
    <Base>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        toolbarClassName="editorToolbar-hidden"
        wrapperClassName="wrapper-class"
        editorClassName="editorr-class"
        toolbar={{
          options: ['inline', 'list', 'textAlign', 'link'],
        }}
        localization={{
          locale: 'ko',
        }}
        onEditorStateChange={onEditorStateChange}
      />
      {!readOnly && <Button onClick={onSave}>Save</Button>}
    </Base>
  );
}

const Base = styled.div`
  padding: 16px;
`;
