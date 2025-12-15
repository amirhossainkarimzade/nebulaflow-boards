import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function pillClass(priority) {
  if (priority === "high") return "bg-rose-500/15 text-rose-200 border-rose-500/30";
  if (priority === "medium") return "bg-amber-500/15 text-amber-200 border-amber-500/30";
  return "bg-emerald-500/15 text-emerald-200 border-emerald-500/30";
}

export default function TaskCard({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={[
        "rounded-2xl border border-slate-700 bg-slate-900/60 p-3 shadow-sm",
        isDragging ? "opacity-60" : "opacity-100",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <button
          onClick={() => onEdit(task)}
          className="text-left font-medium text-slate-100 hover:underline"
          title="Edit task"
        >
          {task.title}
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onDelete(task.id)}
            className="rounded-lg px-2 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            title="Delete"
          >
            ✕
          </button>

          <button
            className="cursor-grab rounded-lg px-2 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200 active:cursor-grabbing"
            title="Drag"
            {...attributes}
            {...listeners}
          >
            ⠿
          </button>
        </div>
      </div>

      {task.description ? (
        <p className="mt-2 text-sm text-slate-400">{task.description}</p>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-2 py-0.5 text-xs ${pillClass(task.priority)}`}>
          {task.priority}
        </span>

        {task.tags?.map((t) => (
          <span
            key={t}
            className="rounded-full border border-slate-700 bg-slate-800/40 px-2 py-0.5 text-xs text-slate-300"
          >
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
}
