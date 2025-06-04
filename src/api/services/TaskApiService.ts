import EntityApiService from "@/api/services/EntityApiService";
import type { I_Task } from "@/types/entities/task";
import type { I_TasksListRequestParams } from "@/types/api/project";
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

  async deleteEntityByProjectId(projectId: I_Project["id"]): Promise<null> {
    await this.delay();

    const entityList = this.storage.getItem<I_Task[]>();

    if (!entityList) {
      throw new Error("Entity not found");
    }

    this.storage.setItem(
      entityList.filter((entity) => entity.projectId !== projectId),
    );

    return null;
  }
}

export default new TaskApiService();
