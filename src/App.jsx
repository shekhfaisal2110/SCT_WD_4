import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import TaskStats from './components/TaskStats';
import FilterPanel from './components/FilterPanel';
import SettingsPanel from './components/SettingsPanel';
import { ToastContainer, toast } from 'react-toastify';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const LOCAL_KEY = 'todo-tasks';
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [view, setView] = useState('Pending');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks));
    checkNotifications();
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    toast.success('✅ Task added');
  };

  const updateTask = (updatedTask) => {
    const newTasks = [...tasks];
    newTasks[editIndex] = { ...newTasks[editIndex], ...updatedTask };
    setTasks(newTasks);
    setEditIndex(null);
    toast.info('✏️ Task updated');
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
    toast(updated[index].completed ? '✅ Marked complete' : '🔁 Marked pending');
  };

  const deleteTask = (index) => {
    const title = tasks[index].title;
    setTasks(tasks.filter((_, i) => i !== index));
    toast.error(`🗑️ Deleted: ${title}`);
  };

  const now = new Date();
  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const taskDate = new Date(task.startDatetime || task.datetime);
      const daysLeft = (taskDate - now) / (1000 * 60 * 60 * 24);
      const categoryMatch = categoryFilter === 'All' || task.category === categoryFilter;

      if (view === 'DueSoon') return !task.completed && daysLeft <= 3 && daysLeft >= 0 && categoryMatch;
      if (view === 'Completed') return task.completed && categoryMatch;
      return !task.completed && categoryMatch;
    });
  };

  const checkNotifications = () => {
    const overdue = tasks.filter(t => new Date(t.startDatetime || t.datetime) < now && !t.completed);
    if (overdue.length > 0) {
      toast.warn(`⚠️ ${overdue.length} overdue task(s)!`);
    }
  };

  const chartData = {
    labels: ['Completed', 'Pending', 'Overdue'],
    datasets: [
      {
        data: [
          tasks.filter(t => t.completed).length,
          tasks.filter(t => !t.completed && new Date(t.startDatetime || t.datetime) >= now).length,
          tasks.filter(t => !t.completed && new Date(t.startDatetime || t.datetime) < now).length,
        ],
        backgroundColor: ['#10b981', '#3b82f6', '#ef4444'],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 1,
      },
    ],
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="max-w-2xl mx-auto p-4 text-white">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4 text-center">📝 To-Do List</h1>

      <TodoInput
        onAdd={addTask}
        onUpdate={updateTask}
        isEditing={editIndex !== null}
        currentTask={tasks[editIndex]}
      />

      <TaskStats tasks={tasks} />
      <FilterPanel
        view={view}
        setView={setView}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <SettingsPanel showChart={showChart} setShowChart={setShowChart} />

      {showChart ? (
        <div className="bg-gray-900 rounded p-4">
          <Pie data={chartData} />
        </div>
      ) : (
        filteredTasks.length === 0 ? (
          <div className="text-center py-10 flex flex-col items-center justify-center">
          <img
            src="task.webp"
            alt="No tasks"
            className="w-48 h-48 mb-4 opacity-80"
          />
          <h2 className="text-lg font-semibold text-gray-300 mb-2">You're all caught up! 🎉</h2>
          <p className="text-sm text-gray-400 max-w-xs">
            No tasks found for this view. Add something productive or take a well-deserved break!
          </p>
        </div>

        ) : (
          [...filteredTasks].reverse().map((task, index) => (
            <TodoItem
              key={index}
              task={task}
              onToggle={() => toggleTask(tasks.indexOf(task))}
              onDelete={() => deleteTask(tasks.indexOf(task))}
              onEdit={() => setEditIndex(tasks.indexOf(task))}
            />
          ))
        )
      )}
    </div>
  );
}