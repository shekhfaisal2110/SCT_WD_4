import { useState, useEffect } from 'react';

export default function TodoInput({ onAdd, onUpdate, isEditing, currentTask }) {
  const getCurrentDatetime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const [title, setTitle] = useState('');
  const [startDatetime, setStartDatetime] = useState(getCurrentDatetime());
  const [endDatetime, setEndDatetime] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [tagColor, setTagColor] = useState('#3b82f6');

  useEffect(() => {
    if (isEditing && currentTask) {
      setTitle(currentTask.title || '');
      setStartDatetime(currentTask.startDatetime || getCurrentDatetime());
      setEndDatetime(currentTask.endDatetime || '');
      setCategory(currentTask.category || 'Work');
      setPriority(currentTask.priority || 'Medium');
      setDescription(currentTask.description || '');
      setIsRecurring(currentTask.isRecurring || false);
      setTagColor(currentTask.tagColor || '#3b82f6');
    } else {
      setTitle('');
      setStartDatetime(getCurrentDatetime());
      setEndDatetime('');
      setCategory('Work');
      setPriority('Medium');
      setDescription('');
      setIsRecurring(false);
      setTagColor('#3b82f6');
    }
  }, [isEditing, currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      startDatetime,
      endDatetime,
      category,
      priority,
      description,
      isRecurring,
      tagColor,
      completed: false,
    };

    if (isEditing) {
      onUpdate(newTask);
    } else {
      onAdd(newTask);
    }

    setTitle('');
    setStartDatetime(getCurrentDatetime());
    setEndDatetime('');
    setCategory('Work');
    setPriority('Medium');
    setDescription('');
    setIsRecurring(false);
    setTagColor('#3b82f6');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 bg-gray-900 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Task name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded text-black"
        required
      />

      <textarea
        placeholder="Task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 rounded text-black"
        rows={2}
      />

      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="datetime-local"
          value={startDatetime}
          onChange={(e) => setStartDatetime(e.target.value)}
          className="p-2 rounded text-black w-full"
          required
        />
        <input
          type="datetime-local"
          value={endDatetime}
          onChange={(e) => setEndDatetime(e.target.value)}
          className="p-2 rounded text-black w-full"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded text-black w-full"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 rounded text-black w-full"
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-white text-sm">
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={() => setIsRecurring(!isRecurring)}
          />
          Recurring Task
        </label>

        <label className="flex items-center gap-2 text-white text-sm">
          🎨 Tag Color:
          <input
            type="color"
            value={tagColor}
            onChange={(e) => setTagColor(e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded"
          />
        </label>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
