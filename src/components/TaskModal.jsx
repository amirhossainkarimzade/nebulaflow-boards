import { useEffect, useState } from "react";
import { COLUMNS } from "../lib/seed";

export default function TaskModal({ open, initialTask, onClose, onSave }) {
  const isEdit = !!initialTask;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [columnId, setColumnId] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (!open) return;

    setTitle(initialTask?.title ?? "");
    setDescription(initialTask?.description ?? "");
    setColumnId(initialTask?.columnId ?? "todo");
    setPriority(initialTask?.priority ?? "medium");
    setTags((initialTask?.tags ?? []).join(", "));
  }, [open, initialTask]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-950 p-5 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">
              {isEdit ? "Edit task" : "New task"}
            </h3>
            <p className="text-sm text-slate-400">Fill details and save.</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <label className="grid gap-1">
            <span className="text-xs text-slate-400">Title *</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
              placeholder="e.g. Implement drag and drop"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-slate-400">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-24 rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
              placeholder="Optional…"
            />
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <label className="grid gap-1">
              <span className="text-xs text-slate-400">Column</span>
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
              >
                {COLUMNS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1">
              <span className="text-xs text-slate-400">Priority</span>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </label>

            <label className="grid gap-1">
              <span className="text-xs text-slate-400">Tags</span>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
                placeholder="ui, backend"
              />
            </label>
          </div>

          <button
            onClick={() => {
              if (!title.trim()) return;
              const parsedTags = tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);

              onSave({
                ...(initialTask ?? {}),
                title: title.trim(),
                description: description.trim(),
                columnId,
                priority,
                tags: parsedTags,
              });
            }}
            className="mt-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-400 px-4 py-2 text-sm font-medium text-white hover:opacity-95"
          >
            Save
          </button>

          {!title.trim() ? (
            <p className="text-xs text-rose-300">Title is required.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
