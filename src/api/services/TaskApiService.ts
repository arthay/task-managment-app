import EntityApiService from "@/api/services/EntityApiService";
import type { I_Task } from "@/types/entities/task";
import type { I_TasksListRequestParams } from "@/types/api/task";
import type { I_Project } from "@/types/entities/project";

class TaskApiService extends EntityApiService {
  constructor() {
    super("tasksList");
  }

  async getEntitiesListByProjectId({
    page,
    pageSize,
    projectId,
    status,
    priority,
    sortBy,
    sortOrder,
  }: I_TasksListRequestParams) {
    return await this.request(async () => {
      const data = await super.getEntities<I_Task, string>(
        { page, pageSize },
        { key: "projectId", value: projectId },
      );

      const filteredEntities = data.entities.filter((entity) => {
        if (status && entity.status !== status) return false;
        return !(priority && entity.priority !== priority);
      });

      if (sortBy) {
        filteredEntities.sort((a, b) => {
          const aVal = a[sortBy];
          const bVal = b[sortBy];

          if (aVal < bVal) {
            return sortOrder === "desc" ? 1 : -1;
          }
          if (aVal > bVal) {
            return sortOrder === "desc" ? -1 : 1;
          }
          return 0;
        });
      }

      return { ...data, entities: filteredEntities };
    });
  }

  async deleteEntityByProjectId(projectId: I_Project["id"]): Promise<null> {
    return await this.request(async () => {
      const entityList = this.storage.getItem<I_Task[]>();

      if (!entityList) {
        throw new Error("Entity not found");
      }

      this.storage.setItem(
        entityList.filter((entity) => entity.projectId !== projectId),
      );

      return null;
    });
  }
}

export default new TaskApiService();
