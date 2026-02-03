import React from 'react';
import Badge from '../../common/components/Badge';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-theme-xs hover:shadow-theme-md transition-shadow group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-theme-sm font-semibold text-gray-900">{note.title}</h3>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(note)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-50 transition-colors"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(note.id)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-error-500 hover:bg-error-50 transition-colors"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <div 
        className="text-theme-sm text-gray-600 mb-4 line-clamp-2 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      <div className="flex justify-between items-center">
        <Badge color={note.statusColor || 'primary'} size="sm" variant="solid">
          {note.status}
        </Badge>
        <div className="flex items-center gap-2 text-gray-400 text-theme-xs">
          <svg className={`size-4 ${note.starred ? 'text-warning-500 fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span>{note.date}</span>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
