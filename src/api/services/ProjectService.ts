import EntityService from "@/api/services/EntityServise";
import taskService from "@/api/services/TaskService";
import type { I_Project } from "@/types/entities/project";

class ProjectService extends EntityService {
  constructor() {
    super("projectsList");
  }

  deleteEntity(id: I_Project["id"]): Promise<null> {
    taskService.deleteEntityByProjectId(id);
    return super.deleteEntity<I_Project>(id);
  }
}

export default new ProjectService();
