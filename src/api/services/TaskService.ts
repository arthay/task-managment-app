import EntityService from "@/api/services/EntityServise";
import type { I_Task } from "@/types/entities/task";
import type { I_TasksListRequestParams } from "@/types/api/project";
import type { I_Project } from "@/types/entities/project";

class TaskService extends EntityService {
  constructor() {
    super("tasksList");
  }

  async getEntitiesList({
    page,
    pageSize,
    projectId,
    status,
    priority,
  }: I_TasksListRequestParams) {
    const data = await super.getEntities<I_Task, string>(
      { page, pageSize },
      { key: "projectId", value: projectId },
    );

    const filteredEntities = data.entities.filter((entity) => {
      if (status && entity.status !== status) return false;
      return !(priority && entity.priority !== priority);
    });

    return { ...data, entities: filteredEntities };
  }

  deleteEntityByProjectId(projectId: I_Project["id"]): Promise<null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const serializedEntitiesList = localStorage.getItem(this.storageKey);

        if (!serializedEntitiesList) {
          resolve(null);

          return;
        }

        try {
          const entityList: I_Task[] = JSON.parse(serializedEntitiesList);

          localStorage.setItem(
            this.storageKey,
            JSON.stringify(
              entityList.filter((entity) => entity.projectId !== projectId),
            ),
          );

          resolve(null);
        } catch {
          reject("Entity not found");
        }
      }, 1000);
    });
  }
}

export default new TaskService();
