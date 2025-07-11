import React from 'react';

export default function FilterPanel({ view, setView, categoryFilter, setCategoryFilter }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow mb-4 flex flex-col md:flex-row gap-3 justify-between items-center text-white">
      <div className="flex gap-2">
        {['Pending', 'DueSoon', 'Completed'].map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-1 rounded ${view === v ? 'bg-blue-600' : 'bg-gray-600'}`}
          >
            {v}
          </button>
        ))}
      </div>

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="bg-gray-800 px-3 py-2 rounded text-white"
      >
        <option value="All">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Urgent">Urgent</option>
      </select>
    </div>
  );
}
