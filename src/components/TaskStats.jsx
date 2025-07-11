import React from 'react';

export default function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  const overdue = tasks.filter(t => !t.completed && new Date(t.startDatetime || t.datetime) < new Date()).length;

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-center">
      <div>
        <h3 className="text-sm">Total Tasks</h3>
        <p className="text-lg font-bold text-blue-400">{total}</p>
      </div>
      <div>
        <h3 className="text-sm">Completed</h3>
        <p className="text-lg font-bold text-green-400">{completed}</p>
      </div>
      <div>
        <h3 className="text-sm">Pending</h3>
        <p className="text-lg font-bold text-yellow-400">{pending}</p>
      </div>
      <div>
        <h3 className="text-sm">Overdue</h3>
        <p className="text-lg font-bold text-red-400">{overdue}</p>
      </div>
    </div>
  );
}
