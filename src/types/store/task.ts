import type { I_Task } from "@/types/entities/task";
import type { I_EntityStory } from "@/types/store/entity";

export interface I_TaskStore extends I_EntityStory {
  entities: I_Task[];
}
