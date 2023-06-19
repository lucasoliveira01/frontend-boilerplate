/* eslint-disable react/no-unused-prop-types */
/* eslint-disable global-require */
import type { FC } from 'react';
import React from 'react';

import type { EditableCSSProperties } from '../../../types/aggerTypes';

interface Props {
  data: string;
  style?: EditableCSSProperties;
  onChange: (editorData: string) => void;
}

const Editor: FC<Props> = () => {
  // const handleChange = (_event: Event, editor: typeof ClassicEditor) => {
  //   if (editor) props.onChange(editor.getData());
  // };

  // const editorRef = useRef();
  // const { CKEditor, ClassicEditor } = editorRef.current || {
  //   ClassicEditor: {},
  //   CKEditor: {},
  // };
  // const [, setEditorLoaded] = useState(false);

  // useEffect(() => {
  //   editorRef.current = {
  //     CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
  //     ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
  //   };
  //   setEditorLoaded(true);
  // }, []);

  return <div />;
};

export default Editor;
