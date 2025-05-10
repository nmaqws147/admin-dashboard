import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { useSideBar } from '../sidebar';
import 'draft-js/dist/Draft.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LOCAL_KEY = 'my-editor-content';

const MyEditor: React.FC = () => {
  const {isOpen} = useSideBar();
  const [editorState, setEditorState] = useState(() => {
    const savedData = localStorage.getItem(LOCAL_KEY);
    if (savedData) {
      try {
        const content = convertFromRaw(JSON.parse(savedData));
        return EditorState.createWithContent(content);
      } catch {
        return EditorState.createEmpty();
      }
    }
    return EditorState.createEmpty();
  });
  useEffect(() => {
    const content = editorState.getCurrentContent();
    const raw = convertToRaw(content);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(raw));
  }, [editorState]);

  return (
    <div className="container mt-4" style={{marginLeft: isOpen ? "240px" : "0" , transition:"0.5s ease all"}}>
      <div className="d-flex flex-wrap gap-2 mb-3">
        <button className="btn btn-sm btn-outline-primary" onClick={() => setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))}>
          <b>B</b>
        </button>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))}>
          <i>I</i>
        </button>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))}>
          <u>U</u>
        </button>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setEditorState(RichUtils.toggleInlineStyle(editorState, 'CODE'))}>
          {'</>'}
        </button>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'))}>
          H1
        </button>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'))}>
          • List
        </button>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'ordered-list-item'))}>
          1. List
        </button>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'blockquote'))}>
          ❝ Quote
        </button>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditorState(RichUtils.toggleBlockType(editorState, 'code-block'))}>
          Code Block
        </button>
      </div>

      <div className="border rounded-lg px-4 py-3 max-w-3xl min-h-[300px] bg-[#fafafa] text-black dark:bg-[#1e1e1e] dark:text-white border-gray-300 dark:border-gray-700 shadow-md"
      style={{minHeight: "250px",width: "80%"}}>
  <Editor editorState={editorState} onChange={setEditorState} />
</div>
<style>
  {`
    .dark .public-DraftEditor-content {
      color: white;
    }
  `}
</style>
    </div>
  );
};

export default MyEditor;
