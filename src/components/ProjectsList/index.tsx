import { useCallback, useState } from "react";
import useProjectsQuery from "@/hooks/queries/useProjectsQuery";
import ProjectItem from "../ProjectItem";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import ProjectModal from "@/components/common/ProjectModal";
import type { I_Project } from "@/types/entities/project";
import { useForm } from "react-hook-form";
import {
  projectFormSchema,
  type T_ProjectForm,
} from "@/components/common/forms/ProjectForm/validation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmModal from "@/components/common/ConfirmModal";
import useDeleteProjectMutation from "@/hooks/mutations/useDeleteProjectMutation";
import { toast } from "sonner";
import useLoadMoreEntities from "@/hooks/useLoadMoreEntities";

const projectDefaultValues = {
  name: "",
  date: new Date(),
};

function ProjectsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editProjectId, setEditProjectId] = useState<I_Project["id"]>("");
  const [deleteProjectId, setDeleteProjectId] = useState<I_Project["id"]>("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useProjectsQuery({});
  const { mutateAsync: deleteProject, isPending: isPendingDeleteProject } =
    useDeleteProjectMutation();

  const projectForm = useForm<T_ProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: projectDefaultValues,
    reValidateMode: "onChange",
  });

  const handleCloseProjectModal = () => {
    setIsModalOpen(false);
    setEditProjectId("");
    projectForm.reset(projectDefaultValues);
  };

  const handleCloseDeleteProjectModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setDeleteProjectId("");
  }, []);

  const lastProjectRef = useLoadMoreEntities(
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  );

  const handleEditProjectClick = (id: I_Project["id"]) => {
    setEditProjectId(id);
    const project = data.projects.find((project) => project.id === id);
    projectForm.reset({
      name: project?.name || projectDefaultValues.name,
      date: new Date(project?.date || ""),
    });
    setIsModalOpen(true);
  };

  const handleDeleteProjectClick = (id: I_Project["id"]) => {
    setDeleteProjectId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteProjectConfirm = async () => {
    try {
      if (!deleteProjectId) {
        return;
      }

      await deleteProject(deleteProjectId);
      handleCloseDeleteProjectModal();
      toast("Project has been deleted successfully.");
    } catch {
      toast("Something went wrong.");
    }
  };

  return (
    <>
      <ProjectModal
        isOpen={isModalOpen}
        editProjectId={editProjectId}
        form={projectForm}
        onOpenChange={handleCloseProjectModal}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={handleCloseDeleteProjectModal}
        onConfirm={handleDeleteProjectConfirm}
        isLoading={isPendingDeleteProject}
        title="Are you sure?"
        description="You’re going to to permanently delete the selected project."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold mb-4">Projects List</h1>
          <Button
            className="cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Create Project
          </Button>
        </div>
        {isPending ? (
          <div className="w-full flex justify-center">
            <Loader />
          </div>
        ) : !data.projects.length ? (
          <div>There are no projects yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {data.projects.map((project, index) => {
              const ref =
                data.projects.length === index + 1 ? lastProjectRef : undefined;
              return (
                <ProjectItem
                  key={project.id}
                  project={project}
                  ref={ref}
                  onEditClick={handleEditProjectClick}
                  onDeleteClick={handleDeleteProjectClick}
                />
              );
            })}
          </div>
        )}
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectsList;
