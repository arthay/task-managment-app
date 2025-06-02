import getRandomId from "@/utils/getRandomId";
import type { I_ListResponse, I_QueryParams } from "@/types/api/general";

class EntityService {
  protected readonly storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  getEntities<TData, TFilterValue = unknown>(
    params: I_QueryParams,
    filter?: { key: string; value: TFilterValue },
  ): Promise<I_ListResponse<TData>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const serializedEntitiesList = localStorage.getItem(this.storageKey);

        if (!serializedEntitiesList) {
          resolve({
            entities: [],
            paginatorInfo: { page: 1, hasNextPage: false, total: 0 },
          });

          return;
        }

        try {
          let entityList: TData[] = JSON.parse(serializedEntitiesList) || [];

          if (filter) {
            entityList = entityList.filter(
              (entity) =>
                (entity as Record<string, unknown>)[filter.key] ===
                filter.value,
            );
          }

          const page = params.page || 1;
          const pageSize = params.pageSize || 10;

          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;

          const data = entityList.slice(startIndex, endIndex);
          const paginatorInfo = {
            page,
            hasNextPage: !!entityList[endIndex + 1],
            total: entityList.length,
          };
          resolve({ entities: data, paginatorInfo });
        } catch {
          localStorage.removeItem(this.storageKey);

          resolve({
            entities: [],
            paginatorInfo: { page: 1, hasNextPage: false, total: 0 },
          });

          return;
        }
      }, 1000);
    });
  }

  createEntity<TData>(data: Omit<TData, "id">): Promise<TData> {
    return new Promise((resolve) => {
      const newEntity = { id: getRandomId(), ...data } as TData;
      const serializedEntityList = localStorage.getItem(this.storageKey);

      if (!serializedEntityList) {
        localStorage.setItem(this.storageKey, JSON.stringify([newEntity]));
        resolve(newEntity);

        return;
      }

      try {
        const tasksList = JSON.parse(serializedEntityList);
        localStorage.setItem(
          this.storageKey,
          JSON.stringify([newEntity, ...tasksList]),
        );
        resolve(newEntity);
      } catch {
        localStorage.setItem(this.storageKey, JSON.stringify([newEntity]));
        resolve(newEntity);
      }
    });
  }

  updateEntity<TData extends { id: unknown }>(data: TData): Promise<TData> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const serializedEntitiesList = localStorage.getItem(this.storageKey);

        if (!serializedEntitiesList) {
          reject("Project not found");
          return;
        }

        try {
          const entityList: TData[] = JSON.parse(serializedEntitiesList);
          const entityIndex = entityList.findIndex(
            (item) => item.id === data.id,
          );

          if (entityIndex < 0) {
            reject("Project not found");
          }

          entityList[entityIndex] = {
            ...entityList[entityIndex],
            ...data,
          };

          localStorage.setItem(this.storageKey, JSON.stringify(entityList));

          resolve(entityList[entityIndex]);
        } catch {
          reject("Project not found");
        }
      }, 1000);
    });
  }

  duplicateEntity<TData extends { id: unknown; name: string }>(
    id: TData["id"],
  ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const serializedEntitiesList = localStorage.getItem(this.storageKey);

        if (!serializedEntitiesList) {
          reject("Entity not found");

          return;
        }

        try {
          const entityList: TData[] = JSON.parse(serializedEntitiesList);
          let entity = entityList.find((item) => item.id === id);

          if (!entity) {
            reject("Entity not found");

            return;
          }

          entity = {
            ...entity,
            name: `${entity.name}(dup)`,
            id: getRandomId(),
          };

          localStorage.setItem(
            this.storageKey,
            JSON.stringify([entity, ...entityList]),
          );

          resolve(entity);
        } catch {
          reject("Entity not found");
        }
      }, 1000);
    });
  }

  deleteEntity<TData extends { id: unknown }>(id: TData["id"]): Promise<null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const serializedEntitiesList = localStorage.getItem(this.storageKey);

        if (!serializedEntitiesList) {
          reject("Entity not found");

          return;
        }

        try {
          const entityList: TData[] = JSON.parse(serializedEntitiesList);

          localStorage.setItem(
            this.storageKey,
            JSON.stringify(entityList.filter((entity) => entity.id !== id)),
          );

          resolve(null);
        } catch {
          reject("Entity not found");
        }
      }, 1000);
    });
  }
}

export default EntityService;
