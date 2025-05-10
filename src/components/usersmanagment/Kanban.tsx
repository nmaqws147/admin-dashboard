import { useState, useEffect } from "react";
import { useSideBar } from "../sidebar";
import React from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent
} from '@dnd-kit/core';

const Kanban: React.FC = () => {
  interface KanbanTasks {
    backlog: string[];
    todo: string[];
    inProgress: string[];
    done: string[];
  }
  
  type ColumnType = 'backlog' | 'todo' | 'inProgress' | 'done';
  type TaskID = string;
  type TasksState = {
    [key in ColumnType]: TaskID[];
  };

  const { isOpen } = useSideBar();

  const [tasks, setTasks] = useState<KanbanTasks>(() => {
    const stored = localStorage.getItem("kanbanTasks");
    try {
      const parsed = stored ? JSON.parse(stored) : null;
      return {
        backlog: parsed?.backlog ?? [],
        todo: parsed?.todo ?? [],
        inProgress: parsed?.inProgress ?? [],
        done: parsed?.done ?? [],
      };
    } catch {
      return {
        backlog: [],
        todo: [],
        inProgress: [],
        done: [],
      };
    }
  });
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);
  function handleDeleteClick (e:React.MouseEvent<HTMLSpanElement>,column: ColumnType,taskId: string){
    e.stopPropagation();
    setTasks((prev) => {
      const update = {...prev};
      update[column] = update[column].filter(id => id !== taskId);
      return update
    })
  }
  const Draggable = ({id, children, data}: { id: string; children: React.ReactNode; data: {column: string, index: number}}) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id,
      data,
    });
    return (
      <div ref={setNodeRef} {...attributes} {...listeners}>
        {children}
      </div>
    )
  }
  const Droppable = ({id, children, data}: {id: string; children: React.ReactNode; data: {column: string, index: number}}) => {
    const {setNodeRef} = useDroppable({
      id,
      data,
    });
    return (
      <div ref={setNodeRef}>
        {children}
      </div>
    )
  }

  const renderTasks = (column: ColumnType) => {
    return tasks[column].map((task, index) => (
      <ul key={index} className="list-unstyled w-100">
        <li
          className="p-2 mb-2 shadow-sm rounded position-relative"
          style={{  
            minHeight: "50px",
            minWidth: "200px",
            fontSize: "16px",
          }}
        >
          <Draggable id={task} data={{ column, index }}>
            <div>{task}</div>
          </Draggable>
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              height: "25px",
              width: "25px",
              cursor: "pointer",
              lineHeight: "25px",
            }}
            className="bg-danger rounded-circle text-center fw-bold"
            onClick={(e) => handleDeleteClick(e, column, task)}
          >
            X
          </span>
        </li>
      </ul>
    ));
  };  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setTasks((prev) => ({
      ...prev,
      backlog: [...prev.backlog, inputValue],
    }));
    setInputValue("");
  }

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
  
    const activeId = active.id as TaskID;
    const overColumn = over?.id as ColumnType | undefined;
  
    if (!overColumn) return;
  
    setTasks((prev: TasksState): TasksState => {
      const newTasks: TasksState = { ...prev };
      for (const column in newTasks) {
        newTasks[column as ColumnType] = newTasks[column as ColumnType].filter(
          id => id !== activeId
        );
      }
      newTasks[overColumn].push(activeId);
      return newTasks;
    });
  };
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        style={{
          marginLeft: isOpen ? "240px" : "0",
          transition: "0.5s ease all",
          padding: "20px",
        }}
      >
        <div
          className="d-flex flex-row gap-4"
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          {["backlog", "todo", "inProgress", "done"].map((col) => (
            <Droppable key={col} id={col} data={{column: col, index: 0}}>
              <div
                className="kanban-card shadow-sm"
                style={{
                  
                  width: "300px",
                  minHeight: "400px",
                  borderRadius: "16px",
                  padding: "20px",
                  flex: "0 0 auto",
                }}
              >
                <h5 className="text-center text-secondary fw-bold text-uppercase mb-3">
                  {col}
                </h5>
                {renderTasks(col as ColumnType)}
              </div>
            </Droppable>
          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <form
            className="d-flex flex-row gap-3"
            style={{ maxWidth: "400px", width: "100%" }}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="form-control shadow-sm rounded"
              value={inputValue}
              placeholder="Add a new task..."
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="btn btn-success shadow-sm">Add</button>
          </form>
        </div>
      </div>
    </DndContext>
  );
};

export default Kanban;