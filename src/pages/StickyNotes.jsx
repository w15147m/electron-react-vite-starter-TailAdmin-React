import React, { useState, useEffect } from 'react';
import Button from '../common/components/Button';
import NoteCard from './components/NoteCard';
import NoteEditor from './components/NoteEditor';

const StickyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

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

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || note.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-screen bg-white font-outfit border border-gray-200 overflow-hidden flex flex-col shadow-none rounded-3xl">
      {/* Header / Search Bar */}
      <div 
        className="p-6 flex items-center gap-3 bg-white z-10"
        style={{ WebkitAppRegion: 'drag' }}
      >
        <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden" style={{ WebkitAppRegion: 'no-drag' }}>
          <input 
            type="text" 
            placeholder="Search title . . ." 
            className="flex-1 px-4 py-2 border-none focus:ring-0 outline-none text-theme-sm placeholder:text-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="px-3 py-2 border-l border-gray-100 bg-gray-50/50 hover:bg-gray-100 transition-colors">
            <svg className="size-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className={`p-2 rounded-lg shadow-theme-sm transition-all ${
                statusFilter !== 'All' 
                  ? 'bg-brand-500 text-white' 
                  : 'bg-brand-500 text-white hover:bg-brand-600'
              }`}
              style={{ WebkitAppRegion: 'no-drag' }}
            >
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>

            {isFilterMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-20" 
                  onClick={() => setIsFilterMenuOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-30">
                  {['All', 'To-do', 'Presentation', 'Hot Fix', 'Ready to Present'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setIsFilterMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-theme-sm transition-colors hover:bg-gray-50 ${
                        statusFilter === status ? 'text-brand-500 font-bold' : 'text-gray-600'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          )}
        </div>
      </div>

        <div className="flex items-center gap-1.5 ml-auto" style={{ WebkitAppRegion: 'no-drag' }}>
          <button onClick={handleAddNote} className="p-1.5 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button 
            className="px-2 py-0.5 text-gray-900 font-bold text-3xl leading-none hover:bg-gray-100 rounded-lg transition-colors" 
            onClick={() => window.minimize()}
          >
            -
          </button>
          <button className="p-1.5 text-gray-900 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all" onClick={() => window.close()}>
            <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Row 2: Active Filters & Clear button */}
      {(searchQuery || statusFilter !== 'All') && (
        <div className="px-6 pb-4 flex items-center gap-3 bg-white border-b border-gray-100" style={{ WebkitAppRegion: 'no-drag' }}>
          {/* Status Pill in front */}
          {statusFilter !== 'All' && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-500 text-white rounded-full text-[11px] font-bold shadow-sm">
              <span>Label: {statusFilter}</span>
              <button 
                onClick={() => setStatusFilter('All')}
                className="hover:opacity-80 transition-opacity"
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                </svg>
              </button>
            </div>
          )}

          {/* Search Indicator */}
          {searchQuery && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[11px] font-bold">
              <span>Search: {searchQuery}</span>
              <button onClick={() => setSearchQuery('')} className="hover:text-gray-900 transition-colors">
                 <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                </svg>
              </button>
            </div>
          )}

          {/* Clear All Button */}
          <button 
            onClick={handleClearFilters}
            className="flex items-center gap-1.5 text-rose-500 hover:text-rose-600 transition-colors text-theme-sm font-bold group"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-3.12 3.12-1.23-1.21c-.39-.39-1.02-.38-1.41 0-.39.39-.39 1.02 0 1.41l.73.73-10.45 10.45c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0l10.45-10.45.73.73c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.21-1.23 3.12-3.12c.39-.39.39-1.03 0-1.42zM6.91 19l-1.41-1.41 7.42-7.42L14.33 11.58 6.91 19z" />
            </svg>
            Clear All Filters
          </button>
        </div>
      )}

      {/* Note List */}
      <div className="p-6 space-y-4 flex-1 overflow-y-auto custom-scrollbar bg-gray-50/50">
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
      <div className="p-6 border-t border-gray-100 flex justify-end items-center bg-white">
        <p className="text-theme-sm font-medium text-gray-900">
          {filteredNotes.length} records
        </p>
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
