import type { Ref, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Edit, Trash } from "lucide-react";
import type { I_Task } from "@/types/entities/task";
import { cn } from "@/lib/utils";
import { priorityClasses } from "@/components/TaskItem/constants";

interface I_TaskItemProps {
  task: I_Task;
  ref?: Ref<HTMLDivElement>;
  onEditClick: (id: I_Task["id"]) => void;
  onDeleteClick: (id: I_Task["id"]) => void;
}

function TaskItem({ task, ref, onEditClick, onDeleteClick }: I_TaskItemProps) {
  const handleCTAClick = (
    event: MouseEvent<HTMLButtonElement>,
    cb: (id: I_Task["id"]) => void,
  ) => {
    event.preventDefault();

    cb(task.id);
  };

  return (
    <Link to={`/tasks/${task.id}`}>
      <Card
        ref={ref}
        className="p-4 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {task.title}
              </h3>
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  priorityClasses[task.priority],
                )}
              >
                {task.priority}
              </span>
            </div>
            <p className="text-sm text-gray-800">{task.status}</p>
            <p className="text-sm text-gray-500">{task.date}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(event) => handleCTAClick(event, onEditClick)}
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={(event) => handleCTAClick(event, onDeleteClick)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default TaskItem;
