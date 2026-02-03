import React, { useEffect, useRef } from 'react';

const TinyMCEEditor = ({ value, onChange, onSave }) => {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (window.tinymce) {
      window.tinymce.init({
        target: textareaRef.current,
        height: 380,
        menubar: false,
        statusbar: false,
        plugins: 'lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
        toolbar: 'undo redo  bold italic h2 blockquote  bullist numlist    advancedMore  customSave',
        toolbar_mode: 'wrap',
        toolbar_location: 'bottom',
        content_style: `
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');
          body { 
            font-family: Outfit, sans-serif; 
            font-size: 15px; 
            line-height: 1.5;
            padding: 5px 10px; 
            color: #333;
            margin: 0;
          }
        `,
        setup: (editor) => {
          editorRef.current = editor;
          
          editor.on('Change KeyUp input', () => {
            onChange(editor.getContent());
          });
          
          // Custom Save Button
          editor.ui.registry.addButton('customSave', {
            text: 'Save',
            onAction: function () {
              const currentContent = editor.getContent();
              onChange(currentContent);
              onSave(currentContent);
            }
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

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <textarea ref={textareaRef} />
    </div>
  );
};


export default TinyMCEEditor;
