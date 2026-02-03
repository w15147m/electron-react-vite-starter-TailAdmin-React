import React from 'react';

const StickyHeader = ({ 
  searchQuery, 
  setSearchQuery, 
  isFilterMenuOpen, 
  setIsFilterMenuOpen, 
  statusFilter, 
  setStatusFilter,
  onAddNote,
  onMinimize,
  onClose
}) => {
  return (
    <div 
      className="px-6 py-4 flex items-center gap-4 bg-white z-10"
      style={{ WebkitAppRegion: 'drag' }}
    >
      {/* Search Bar */}
      <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden" style={{ WebkitAppRegion: 'no-drag' }}>
        <input 
          type="text" 
          placeholder="Search title . . ." 
          className="flex-1 px-4 py-2 border-none focus:ring-0 outline-none text-[13px] placeholder:text-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="px-2.5 py-1.5 border-l border-gray-100 bg-white hover:bg-gray-50 transition-colors">
          <svg className="size-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      
      {/* Filter Button */}
      <div className="relative">
        <button 
          onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          className="p-1 bg-brand-500 text-white rounded-lg shadow-theme-sm hover:bg-brand-600 transition-all focus:outline-none"
          style={{ WebkitAppRegion: 'no-drag' }}
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>

        {isFilterMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-20" 
              onClick={() => setIsFilterMenuOpen(false)}
            ></div>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-30 overflow-hidden" style={{ WebkitAppRegion: 'no-drag' }}>
              {['All', 'To-do', 'Presentation', 'Hot Fix', 'Ready to Present'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setIsFilterMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-theme-sm transition-colors hover:bg-gray-50 ${
                    statusFilter === status ? 'text-brand-500 font-bold bg-brand-50/20' : 'text-gray-600'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Window Controls */}
      <div className="flex items-center gap-1 ml-auto" style={{ WebkitAppRegion: 'no-drag' }}>
        <button onClick={onAddNote} className="p-0.5 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button 
          className="px-1.5 py-0.5 text-gray-900 font-bold text-base leading-none hover:bg-gray-100 rounded-lg transition-colors focus:outline-none" 
          onClick={onMinimize}
        >
          -
        </button>
        <button className="p-0.5 text-gray-900 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all focus:outline-none" onClick={onClose}>
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StickyHeader;
