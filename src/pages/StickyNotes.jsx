import React, { useState, useEffect } from 'react';
import NoteCard from './components/NoteCard';
import NoteEditor from './components/NoteEditor';
import StickyHeader from './components/StickyHeader';
import FilterBar from './components/FilterBar';

const StickyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isMini, setIsMini] = useState(false);

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
    if (window.confirm('Are you sure you want to delete this note?')) {
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

  const handleToggleMini = () => {
    const newMini = !isMini;
    setIsMini(newMini);
    if (window.electron && window.electron.toggleMiniMode) {
      window.electron.toggleMiniMode(newMini);
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || note.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isMini) {
    return (
      <div 
        onClick={handleToggleMini}
        className="w-8 h-16 bg-brand-500 rounded-l-xl flex items-center justify-center cursor-pointer shadow-2xl hover:bg-brand-600 transition-all border-y border-l border-white/20 group animate-in slide-in-from-right duration-300"
        title="Open Sticky Notes"
        style={{ WebkitAppRegion: 'no-drag' }}
      >
        <svg className="size-5 text-white opacity-80 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white font-outfit border border-gray-200 overflow-hidden flex flex-col shadow-none rounded-3xl text-gray-900">
      
      <StickyHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isFilterMenuOpen={isFilterMenuOpen}
        setIsFilterMenuOpen={setIsFilterMenuOpen}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onAddNote={handleAddNote}
        onMinimize={handleToggleMini}
        onClose={() => window.electron.close()}
      />

      <FilterBar 
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onClearFilters={handleClearFilters}
        onClearStatus={() => setStatusFilter('All')}
        onClearSearch={() => setSearchQuery('')}
      />

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
