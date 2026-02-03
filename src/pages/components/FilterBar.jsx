import React from 'react';

const FilterBar = ({ 
  searchQuery, 
  statusFilter, 
  onClearFilters, 
  onClearStatus, 
  onClearSearch 
}) => {
  if (!searchQuery && statusFilter === 'All') return null;

  return (
    <div className="px-6 pb-4 flex items-center gap-3 bg-white border-b border-gray-100" style={{ WebkitAppRegion: 'no-drag' }}>
      {/* Clear All Button FIRST */}
      <button 
        onClick={onClearFilters}
        className="flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors text-[12px] font-bold group"
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-3.12 3.12-1.23-1.21c-.39-.39-1.02-.38-1.41 0-.39.39-.39 1.02 0 1.41l.73.73-10.45 10.45c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0l10.45-10.45.73.73c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.21-1.23 3.12-3.12c.39-.39.39-1.03 0-1.42zM6.91 19l-1.41-1.41 7.42-7.42L14.33 11.58 6.91 19z" />
        </svg>
        Clear All Filters
      </button>

      {/* Status Pill */}
      {statusFilter !== 'All' && (
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-500 text-white rounded-lg text-[11px] font-bold shadow-sm">
          <span>Label: {statusFilter}</span>
          <button 
            onClick={onClearStatus}
            className="hover:opacity-80 transition-opacity"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
            </svg>
          </button>
        </div>
      )}

      {/* Search Pill */}
      {searchQuery && (
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 text-gray-500 rounded-lg text-[11px] font-bold shadow-sm">
          <span>Search: {searchQuery}</span>
          <button 
            onClick={onClearSearch}
            className="hover:opacity-80 transition-opacity"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
