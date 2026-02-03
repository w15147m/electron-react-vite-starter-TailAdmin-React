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

  const handleSave = (directContent) => {
    const finalContent = directContent !== undefined ? directContent : content;
    onSave({
      ...note,
      title,
      content: finalContent,
      status,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-[2px]"
      style={{ WebkitAppRegion: 'no-drag' }}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-50">
        {/* Simplified Minimalist Header */}
        <div className="px-8 pt-4 pb-2 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="text-gray-900 hover:text-brand-500 transition-colors cursor-pointer p-1">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h2 className="text-theme-sm font-bold text-gray-900">Note</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-brand-500 transition-colors cursor-pointer p-1">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-8 pb-8 space-y-2 flex-1 flex flex-col">
          <div className="grid grid-cols-2 gap-10 border border-gray-100 rounded-2xl p-2">
            <div className="group border-b border-gray-50 focus-within:border-brand-500 transition-colors pb-1">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-focus-within:text-brand-500 transition-colors">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-0 py-0 text-theme-sm font-bold border-none focus:ring-0 outline-none placeholder:text-gray-200 transition-all text-gray-900"
                placeholder="Enter title..."
              />
            </div>

            <div className="group border-b border-gray-50 focus-within:border-brand-500 transition-colors pb-1">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-focus-within:text-brand-500 transition-colors">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-0 py-0 text-theme-sm font-bold border-none focus:ring-0 outline-none bg-white cursor-pointer appearance-none transition-all text-gray-900"
              >
                <option value="To-do">To-do</option>
                <option value="Presentation">Presentation</option>
                <option value="Hot Fix">Hot Fix</option>
                <option value="Ready to Present">Ready to Present</option>
              </select>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0">
             <TinyMCEEditor 
               value={content} 
               onChange={setContent} 
               onSave={handleSave}
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
