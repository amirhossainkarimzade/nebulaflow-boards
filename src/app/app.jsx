import { useMemo, useState } from "react";
import TopBar from "../components/TopBar";
import Board from "../components/Board";
import TaskModal from "../components/TaskModal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { SEED_TASKS } from "../lib/seed";
import { uid } from "../lib/ids";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("nebulaflow_tasks", SEED_TASKS);
  const [query, setQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.columnId === "done").length;
    return { total, done };
  }, [tasks]);

  function openNew() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(task) {
    setEditing(task);
    setModalOpen(true);
  }

  function saveTask(task) {
    if (editing) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([{ ...task, id: uid("task") }, ...tasks]);
    }
    setModalOpen(false);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <TopBar query={query} setQuery={setQuery} onNewTask={openNew} />

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
          <span className="rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1">
            Total: <span className="text-slate-200">{stats.total}</span>
          </span>
          <span className="rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1">
            Done: <span className="text-slate-200">{stats.done}</span>
          </span>
          <span className="ml-auto text-xs text-slate-500">
            Data saved locally
          </span>
        </div>

        <Board
          tasks={tasks}
          setTasks={setTasks}
          query={query}
          onEdit={openEdit}
          onDelete={deleteTask}
        />

        <TaskModal
          open={modalOpen}
          initialTask={editing}
          onClose={() => setModalOpen(false)}
          onSave={saveTask}
        />
      </div>
    </div>
  );
}
