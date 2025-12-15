import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

export default function Column({ column, tasks, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id, 
  });

  return (
    <div
      ref={setNodeRef}
      className={[
        "flex flex-col rounded-3xl border bg-slate-950/30 p-4 transition",
        "border-slate-800",
        isOver ? "border-sky-400/60 bg-slate-950/50" : "",
      ].join(" ")}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-200">{column.title}</h2>
        <span className="rounded-full border border-slate-700 bg-slate-900/60 px-2 py-0.5 text-xs text-slate-300">
          {tasks.length}
        </span>
      </div>

      <div className="min-h-[140px]">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-3">
            {tasks.length ? (
              tasks.map((t) => (
                <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 p-4 text-sm text-slate-500">
                Drop tasks here
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
