import type { Ref, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Edit, Trash } from "lucide-react";
import type { I_Project } from "@/types/entities/project";
import testIds from "@/components/ProjectItem/testIds";

interface I_ProjectItemProps {
  project: I_Project;
  ref?: Ref<HTMLDivElement>;
  onEditClick: (id: I_Project["id"]) => void;
  onDeleteClick: (id: I_Project["id"]) => void;
}

function ProjectItem({
  project,
  ref,
  onEditClick,
  onDeleteClick,
}: I_ProjectItemProps) {
  const handleCTAClick = (
    event: MouseEvent<HTMLButtonElement>,
    cb: (id: I_Project["id"]) => void,
  ) => {
    event.preventDefault();

    cb(project.id);
  };

  return (
    <Link data-testid={testIds.linkProject} to={`/projects/${project.id}`}>
      <Card
        ref={ref}
        className="p-4 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {project.name}
            </h3>
            <p className="text-sm text-gray-500">{project.date}</p>
          </div>
          <div className="flex space-x-2">
            <button
              data-testid={testIds.editProjectButton}
              onClick={(event) => handleCTAClick(event, onEditClick)}
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              data-testid={testIds.deleteProjectButton}
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

export default ProjectItem;
