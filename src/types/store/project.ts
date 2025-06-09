import type { I_Project } from "@/types/entities/project";

import type { I_EntityStory } from "@/types/store/entity";

export interface I_ProjectStore extends I_EntityStory {
  entities: I_Project[];
}
