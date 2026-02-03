import React, { useEffect, useRef, useState } from 'react';

const TinyMCEEditor = ({ value, onChange, onSave }) => {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);
  const valueRef = useRef(value);
  const [isReady, setIsReady] = useState(false);

  // Keep valueRef in sync with prop for non-looping comparison
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

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
          /* Prevent internal focus borders */
          .mce-content-body:focus-within {
             outline: none !important;
          }
        `,
        setup: (editor) => {
          editorInstance = editor;
          editorRef.current = editor;
          
          editor.on('init', () => {
             setIsReady(true);
             // More stable than initialValue for dynamic loading
             if (valueRef.current) {
               try {
                 editor.setContent(valueRef.current);
               } catch (e) {
                 console.warn('TinyMCE init setContent failed:', e);
               }
             }
          });

          editor.on('Change KeyUp input', () => {
             try {
               const content = editor.getContent();
               if (content !== valueRef.current) {
                  valueRef.current = content;
                  onChange(content);
               }
             } catch (e) {
               // Silently catch serialization errors during rapid typing/teardown
             }
          });

          editor.ui.registry.addButton('customSave', {
            text: 'Save',
            onAction: function () {
              try {
                const currentContent = editor.getContent();
                onChange(currentContent);
                onSave(currentContent);
              } catch (e) {
                onSave(); // Fallback if content retrieval fails
              }
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
  }, []); // Mount/Unmount only

  // Sync external changes (e.g. note switching)
  useEffect(() => {
    if (isReady && editorRef.current) {
      try {
        const currentContent = editorRef.current.getContent();
        if (value !== currentContent) {
          editorRef.current.setContent(value || '');
          valueRef.current = value;
        }
      } catch (e) {
        // Safe skip if editor is in inconsistent state
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
