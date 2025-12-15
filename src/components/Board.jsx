import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
  } from "@dnd-kit/core";
  import {
    
    arrayMove,
  } from "@dnd-kit/sortable";
  import { useMemo, useState } from "react";
  import Column from "./Column";
  import TaskCard from "./TaskCard";
  import { COLUMNS } from "../lib/seed";
  
  export default function Board({ tasks, setTasks, query, onEdit, onDelete }) {
    const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
    );
  
    const [activeTaskId, setActiveTaskId] = useState(null);
  
    const filteredTasks = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return tasks;
  
      return tasks.filter((t) => {
        const hay = `${t.title} ${t.description ?? ""} ${(t.tags ?? []).join(" ")}`.toLowerCase();
        return hay.includes(q);
      });
    }, [tasks, query]);
  
    const tasksByColumn = useMemo(() => {
      const map = {};
      for (const c of COLUMNS) map[c.id] = [];
      for (const t of filteredTasks) map[t.columnId].push(t);
      return map;
    }, [filteredTasks]);
  
    const activeTask = useMemo(
      () => tasks.find((t) => t.id === activeTaskId) ?? null,
      [tasks, activeTaskId]
    );
  
    function handleDragStart(event) {
      setActiveTaskId(event.active.id);
    }
  
    function handleDragEnd(event) {
      const { active, over } = event;
      setActiveTaskId(null);
      if (!over) return;
    
      const activeId = active.id;
      const overId = over.id;
      if (activeId === overId) return;
    
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      if (activeIndex === -1) return;
    
      const overIndex = tasks.findIndex((t) => t.id === overId);
      if (overIndex !== -1) {
        const activeTask = tasks[activeIndex];
        const overTask = tasks[overIndex];
    
        const next = [...tasks];
        if (activeTask.columnId !== overTask.columnId) {
          next[activeIndex] = { ...next[activeIndex], columnId: overTask.columnId };
        }
    
        setTasks(arrayMove(next, activeIndex, overIndex));
        return;
      }
    
      const columnIds = ["todo", "doing", "done"];
      if (typeof overId === "string" && columnIds.includes(overId)) {
        const next = [...tasks];
    
        const movedTask = { ...next[activeIndex], columnId: overId };
    
        next.splice(activeIndex, 1);
    
        const lastIndex = (() => {
          let last = -1;
          for (let i = 0; i < next.length; i++) {
            if (next[i].columnId === overId) last = i;
          }
          return last;
        })();
    
        next.splice(lastIndex + 1, 0, movedTask);
        setTasks(next);
      }
    }
    
      
  
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {COLUMNS.map((col) => (
  <div key={col.id}>
    <Column
      column={col}
      tasks={tasksByColumn[col.id] ?? []}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  </div>
))}

        </div>
  
        <DragOverlay>
          {activeTask ? (
            <div className="w-[320px]">
              <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  }
  