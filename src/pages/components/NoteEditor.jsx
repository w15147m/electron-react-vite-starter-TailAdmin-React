import React, { useState, useEffect } from 'react';
import Button from '../../common/components/Button';
import TinyMCEEditor from './TinyMCEEditor';

const NoteEditor = ({ note, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('To-do');

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setStatus(note.status || 'To-do');
    }
  }, [note]);

  const handleSave = () => {
    onSave({
      ...note,
      title,
      content,
      status,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-theme-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-theme-xl font-semibold text-gray-900">
            {note?.id ? 'Edit Note' : 'Create New Note'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          <div>
            <label className="block text-theme-xs font-semibold text-gray-500 uppercase mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter note title..."
            />
          </div>

          <div>
            <label className="block text-theme-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="To-do">To-do</option>
              <option value="Presentation">Presentation</option>
              <option value="Hot Fix">Hot Fix</option>
              <option value="Ready to Present">Ready to Present</option>
            </select>
          </div>

          <div>
            <label className="block text-theme-xs font-semibold text-gray-500 uppercase mb-1">Content</label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <TinyMCEEditor value={content} onChange={setContent} />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Note</Button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
