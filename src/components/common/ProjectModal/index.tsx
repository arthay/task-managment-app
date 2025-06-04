import { useCallback } from "react";
import { format } from "date-fns";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import Modal from "@/components/common/Modal";
import ProjectForm from "@/components/common/forms/ProjectForm";

import type { T_ProjectForm } from "@/components/common/forms/ProjectForm/validation.schema";
import useCreateProjectMutation from "@/hooks/mutations/useCreateProjectMutation";
import useUpdateProjectMutation from "@/hooks/mutations/useUpdateProjectMutation";
import type { I_Project } from "@/types/entities/project";

interface I_ProjectModalProps {
  isOpen: boolean;
  editProjectId: string;
  form: UseFormReturn<T_ProjectForm>;
  onOpenChange: () => void;
}

function ProjectModal({
  isOpen,
  onOpenChange,
  editProjectId,
  form,
}: I_ProjectModalProps) {
  const { mutateAsync: createProject, isPending: isPendingCreateProject } =
    useCreateProjectMutation();
  const { mutateAsync: updateProject, isPending: isPendingUpdateProject } =
    useUpdateProjectMutation();

  const handleFormSubmit = useCallback(
    async (values: T_ProjectForm) => {
      try {
        const data = {
          ...values,
          ...("date" in values && { date: format(values.date, "dd-MM-yyyy") }),
        } as I_Project;

        if (editProjectId) {
          await updateProject({ ...data, id: editProjectId });
          toast("Project has been updated successfully.");
          onOpenChange();

          return;
        }

        await createProject(data);
        toast("Project has been created successfully.");

        onOpenChange();
      } catch {
        toast("Something went wrong.");
      }
    },
    [createProject, editProjectId, onOpenChange, updateProject],
  );

  return (
    <Modal
      open={isOpen}
      onClose={onOpenChange}
      title={`${editProjectId ? "Edit" : "Create"} Project`}
    >
      <ProjectForm
        form={form}
        isLoading={isPendingCreateProject || isPendingUpdateProject}
        onSubmit={handleFormSubmit}
      />
    </Modal>
  );
}

export default ProjectModal;
