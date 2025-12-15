export default function TopBar({ query, setQuery, onNewTask }) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-100">
            NebulaFlow Boards
          </h1>
          <p className="text-sm text-slate-400">
            Trello-like board (Tailwind + LocalStorage + DnD)
          </p>
        </div>
  
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks…"
            className="w-60 rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-sky-400"
          />
          <button
            onClick={onNewTask}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-sky-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-95"
          >
            + New task
          </button>
        </div>
      </div>
    );
  }
  