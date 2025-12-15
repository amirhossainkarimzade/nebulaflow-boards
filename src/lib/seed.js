import { uid } from "./ids";

export const COLUMNS = [
  { id: "todo", title: "Todo" },
  { id: "doing", title: "Doing" },
  { id: "done", title: "Done" },
];

export const SEED_TASKS = [
  {
    id: uid("task"),
    title: "Design board UI",
    description: "Create columns, task cards, and a clean layout.",
    columnId: "todo",
    priority: "medium",
    tags: ["ui", "react"],
  },
  {
    id: uid("task"),
    title: "Add drag & drop",
    description: "Move tasks between columns with dnd-kit.",
    columnId: "doing",
    priority: "high",
    tags: ["dnd", "logic"],
  },
  {
    id: uid("task"),
    title: "Persist to localStorage",
    description: "Tasks should remain after refresh.",
    columnId: "done",
    priority: "low",
    tags: ["storage"],
  },
];
