import React, { useEffect, useRef } from 'react';

const TinyMCEEditor = ({ value, onChange }) => {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (window.tinymce) {
      window.tinymce.init({
        target: textareaRef.current,
        height: 300,
        menubar: false,
        statusbar: false,
        plugins: 'lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
        toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
        content_style: 'body { font-family: Outfit, sans-serif; font-size: 14px }',
        setup: (editor) => {
          editorRef.current = editor;
          editor.on('Change', () => {
            onChange(editor.getContent());
          });
        },
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getContent()) {
      editorRef.current.setContent(value || '');
    }
  }, [value]);

  return <textarea ref={textareaRef} />;
};

export default TinyMCEEditor;
