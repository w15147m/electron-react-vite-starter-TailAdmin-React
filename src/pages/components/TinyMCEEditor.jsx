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
        toolbar: 'undo redo | bold italic h2 blockquote | bullist numlist | link image | advancedMore | customSave',
        toolbar_mode: 'wrap',
        toolbar_location: 'bottom',
        placeholder: 'Enter Text......',
        content_style: `
          body { 
            font-family: Outfit, sans-serif; 
            font-size: 15px; 
            line-height: 1.6;
            padding: 20px; 
            color: #333;
          }
        `,
        setup: (editor) => {
          editorRef.current = editor;
          
          editor.on('Change', () => {
            onChange(editor.getContent());
          });

          // Advanced dropdown button
          editor.ui.registry.addMenuButton('advancedMore', {
            icon: 'more-drawer',
            tooltip: 'More options',
            fetch: function (callback) {
              const items = [
                { type: 'menuitem', text: 'Underline', icon: 'underline', onAction: () => editor.execCommand('Underline') },
                { type: 'menuitem', text: 'Strikethrough', icon: 'strike-through', onAction: () => editor.execCommand('Strikethrough') },
                { type: 'separator' },
                { type: 'menuitem', text: 'Align Left', icon: 'align-left', onAction: () => editor.execCommand('JustifyLeft') },
                { type: 'menuitem', text: 'Align Center', icon: 'align-center', onAction: () => editor.execCommand('JustifyCenter') },
                { type: 'menuitem', text: 'Align Right', icon: 'align-right', onAction: () => editor.execCommand('JustifyRight') },
                { type: 'separator' },
                { type: 'menuitem', text: 'Clear Formatting', icon: 'remove-formatting', onAction: () => editor.execCommand('RemoveFormat') }
              ];
              callback(items);
            }
          });

          // Custom Save Button
          editor.ui.registry.addButton('customSave', {
            text: 'Save',
            onAction: function () {
              onSave();
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
