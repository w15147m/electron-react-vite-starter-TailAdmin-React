import React, { useState, useEffect } from 'react';
import Button from '../common/components/Button';
import NoteCard from './components/NoteCard';
import NoteEditor from './components/NoteEditor';

const StickyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('sticky-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // Sample data based on mockup
      const sampleNotes = [
        {
          id: 1,
          title: 'Presentation',
          content: 'Add Membership on sidbar and show only for admin and compony Refine code Add users count o ...',
          status: 'Ready to Present',
          statusColor: 'success',
          date: '03 Feb',
          starred: true
        },
        {
          id: 2,
          title: 'To-do',
          content: 'Setup database for plan item',
          status: 'Hot Fix',
          statusColor: 'error',
          date: '03 Feb',
          starred: true
        }
      ];
      setNotes(sampleNotes);
      localStorage.setItem('sticky-notes', JSON.stringify(sampleNotes));
    }
  }, []);

  // Save notes to localStorage
  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem('sticky-notes', JSON.stringify(newNotes));
  };

  const handleAddNote = () => {
    setEditingNote(null);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleDeleteNote = (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      saveNotes(notes.filter(n => n.id !== id));
    }
  };

  const handleSaveNote = (noteData) => {
    if (editingNote) {
      saveNotes(notes.map(n => n.id === editingNote.id ? { ...noteData, id: n.id } : n));
    } else {
      saveNotes([...notes, { ...noteData, id: Date.now() }]);
    }
    setIsEditorOpen(false);
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-outfit p-6 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-theme-xl max-w-2xl w-full border border-gray-200 overflow-hidden">
        {/* Header / Search Bar */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search title . . ." 
              className="w-full pl-10 pr-12 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-500 outline-none text-theme-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-1 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
               <svg className="size-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
          </div>
          
          <button className="p-3 bg-white border border-brand-200 rounded-xl text-brand-500 hover:bg-brand-50 shadow-theme-sm transition-colors">
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <button onClick={handleAddNote} className="p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className="p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button className="p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Note List */}
        <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
          {filteredNotes.length > 0 ? (
            filteredNotes.map(note => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onEdit={handleEditNote} 
                onDelete={handleDeleteNote} 
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No notes found matching your search.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end items-center">
          <p className="text-theme-sm font-medium text-gray-900">
            {filteredNotes.length} records
          </p>
        </div>
      </div>

      {isEditorOpen && (
        <NoteEditor 
          note={editingNote} 
          onSave={handleSaveNote} 
          onClose={() => setIsEditorOpen(false)} 
        />
      )}
    </div>
  );
};

export default StickyNotes;
