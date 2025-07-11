import { FaTrash, FaCheckCircle, FaEdit, FaThumbtack } from 'react-icons/fa';
import { useState } from 'react';

export default function TodoItem({ task, onToggle, onDelete, onEdit, onPinToggle }) {
  const now = new Date();
  const startDate = new Date(task.startDatetime);
  const endDate = task.endDatetime ? new Date(task.endDatetime) : null;

  const isOverdue = !task.completed && endDate && endDate < now;
  const daysLeft = endDate ? Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)) : null;
  const isDueSoon = !task.completed && daysLeft <= 2 && daysLeft > 0;

  const badgeColor =
    task.category === 'Work'
      ? 'bg-blue-500'
      : task.category === 'Personal'
      ? 'bg-green-500'
      : 'bg-red-500';

  const priorityColor =
    task.priority === 'High'
      ? 'text-red-500'
      : task.priority === 'Medium'
      ? 'text-yellow-500'
      : 'text-green-400';

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`flex flex-col p-3 rounded mb-2 border ${
        isOverdue
          ? 'border-red-500 bg-gray-700'
          : isDueSoon
          ? 'border-yellow-400 bg-gray-700'
          : 'bg-gray-800 border-transparent'
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1 cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <p className={`font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </p>
          <small className="text-gray-300">Start: {task.startDatetime}</small>
          {task.endDatetime && (
            <small className="block text-gray-300">End: {task.endDatetime}</small>
          )}
          <div className="mt-1 flex flex-wrap items-center gap-2">
           <span
             className="ml-2 text-xs px-2 py-1 rounded-full"
             style={{ backgroundColor: task.color || '#3b82f6', color: 'white' }}
           >
             {task.category}
           </span>

            {task.priority && (
              <span className={`text-xs font-bold ${priorityColor}`}>• {task.priority}</span>
            )}
            {isOverdue && <span className="text-xs text-red-400">(Overdue)</span>}
            {isDueSoon && <span className="text-xs text-yellow-300">(Due Soon)</span>}
          </div>
        </div>
        <div className="flex gap-2 items-center ml-2">
          <button onClick={() => onPinToggle(task)} title="Pin/Unpin">
            <FaThumbtack
              className={`transition-transform ${
                task.pinned
                  ? 'text-yellow-400 rotate-45'
                  : 'text-gray-400 hover:text-yellow-400'
              }`}
            />
          </button>
          <button onClick={onToggle}>
            <FaCheckCircle
              className={`text-lg ${
                task.completed ? 'text-green-500' : 'text-gray-400'
              }`}
            />
          </button>
          <button onClick={onEdit}>
            <FaEdit className="text-yellow-500 text-lg" />
          </button>
          <button onClick={onDelete}>
            <FaTrash className="text-lg text-red-500" />
          </button>
        </div>
      </div>

      {expanded && task.description && (
        <div className="mt-2 text-sm text-gray-300 bg-gray-900 p-2 rounded">
          <strong>Description:</strong>
          <p className="mt-1 whitespace-pre-wrap">{task.description}</p>
        </div>
      )}
    </div>
  );
}