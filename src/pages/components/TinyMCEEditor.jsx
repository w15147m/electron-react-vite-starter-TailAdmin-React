import React, { useEffect, useRef, useState } from 'react';

const TinyMCEEditor = ({ value, onChange, onSave }) => {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  
  // Use refs for handlers to avoid closure issues in TinyMCE event listeners
  const onChangeRef = useRef(onChange);
  const onSaveRef = useRef(onSave);
  
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  
  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  useEffect(() => {
    let editorInstance = null;
    
    if (window.tinymce) {
      window.tinymce.init({
        target: textareaRef.current,
        height: 380,
        menubar: false,
        statusbar: false,
        plugins: 'lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
        toolbar: 'undo redo | bold italic h2 blockquote | bullist numlist | customSave',
        toolbar_location: 'bottom',
        content_style: `
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');
          body { 
            font-family: Outfit, sans-serif; 
            font-size: 15px; 
            line-height: 1.5;
            padding: 10px 15px; 
            color: #333;
            margin: 0;
            background: white;
          }
        `,
        setup: (editor) => {
          editorInstance = editor;
          editorRef.current = editor;
          
          editor.on('init', () => {
             setIsReady(true);
             if (value) {
                editor.setContent(value);
             }
          });

          editor.on('Change KeyUp input', () => {
             const content = editor.getContent();
             if (onChangeRef.current) {
                onChangeRef.current(content);
             }
          });

          editor.ui.registry.addButton('customSave', {
            text: 'Save',
            onAction: function () {
              const currentContent = editor.getContent();
              // Force update parents before calling save
              if (onChangeRef.current) onChangeRef.current(currentContent);
              if (onSaveRef.current) onSaveRef.current(currentContent);
            }
          });
        },
      });
    }

    return () => {
      if (editorInstance) {
        window.tinymce.remove(editorInstance);
        editorRef.current = null;
        setIsReady(false);
      }
    };
  }, []); // Only mount/unmount

  // External updates to value (e.g. initial load or undo/redo)
  useEffect(() => {
    if (isReady && editorRef.current) {
      const currentContent = editorRef.current.getContent();
      if (value !== currentContent) {
        editorRef.current.setContent(value || '');
      }
    }
  }, [value, isReady]);

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <textarea ref={textareaRef} />
    </div>
  );
};

export default TinyMCEEditor;
