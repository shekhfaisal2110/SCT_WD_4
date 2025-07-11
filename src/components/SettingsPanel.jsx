import React from 'react';

export default function SettingsPanel({ showChart, setShowChart }) {
  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={() => setShowChart(!showChart)}
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition"
      >
        {showChart ? '📝 View Tasks' : '📊 Show Chart'}
      </button>
    </div>
  );
}
