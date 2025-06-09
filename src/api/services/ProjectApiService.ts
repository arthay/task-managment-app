import EntityApiService from "@/api/services/EntityApiService";
import taskApiService from "@/api/services/TaskApiService";
import type { I_Project } from "@/types/entities/project";

class ProjectApiService extends EntityApiService {
  constructor() {
    super("projectsList");
  }

  async deleteEntity(id: I_Project["id"]): Promise<null> {
    return await this.request<null>(async () => {
      const projectTasks = await taskApiService.getEntities(
        {},
        { key: "projectId", value: id },
      );

      if (projectTasks.entities && projectTasks.entities.length) {
        throw new Error("There are some entities assigned to the project.");
      }

      await super.deleteEntity<I_Project>(id);

      return null;
    });
  }
}

export default new ProjectApiService();
