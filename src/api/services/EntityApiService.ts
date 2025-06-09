import getRandomId from "@/utils/getRandomId";
import type { I_ListResponse, I_QueryParams } from "@/types/api/general";
import MockApiService from "@/api/services/MockApiService";
import StorageService from "@/api/services/StorageService";

class EntityApiService extends MockApiService {
  protected readonly storage: StorageService;

  constructor(storageKey: string) {
    super();
    this.storage = new StorageService(storageKey);
  }

  async getEntities<TData, TFilterValue = unknown>(
    params: I_QueryParams,
    filter?: { key: string; value: TFilterValue },
  ): Promise<I_ListResponse<TData>> {
    return await this.request<I_ListResponse<TData>>(async () => {
      let entityList = this.storage.getItem<TData[]>();

      if (!entityList) {
        return {
          entities: [],
          paginatorInfo: { page: 1, hasNextPage: false, total: 0 },
        };
      }

      if (filter) {
        entityList = entityList.filter(
          (entity) =>
            (entity as Record<string, unknown>)[filter.key] === filter.value,
        );
      }

      const page = params.page || 1;
      const pageSize = params.pageSize || 10;

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const data = entityList.slice(startIndex, endIndex);
      const paginatorInfo = {
        page,
        hasNextPage: !!entityList[endIndex],
        total: entityList.length,
      };

      return { entities: data, paginatorInfo };
    });
  }

  async createEntity<TData>(data: Omit<TData, "id">): Promise<TData> {
    return this.request<TData>(async () => {
      const newEntity = { id: getRandomId(), ...data } as TData;
      const entityList = this.storage.getItem<TData[]>();

      this.storage.setItem(
        entityList ? [newEntity, ...entityList] : [newEntity],
      );

      return newEntity;
    });
  }

  async updateEntity<TData extends { id: unknown }>(
    data: TData,
  ): Promise<TData> {
    return await this.request<TData>(async () => {
      const entityList = this.storage.getItem<TData[]>();

      if (!entityList) {
        throw new Error("Entity not found");
      }

      const entityIndex = entityList.findIndex((item) => item.id === data.id);

      if (entityIndex < 0) {
        throw new Error("Entity not found");
      }

      entityList[entityIndex] = {
        ...entityList[entityIndex],
        ...data,
      };

      this.storage.setItem(entityList);

      return entityList[entityIndex];
    });
  }

  async duplicateEntity<TData extends { id: unknown; name: string }>(
    id: TData["id"],
  ) {
    return await this.request<TData>(async () => {
      const entityList = this.storage.getItem<TData[]>();

      if (!entityList) {
        throw new Error("Entity not found");
      }

      const entity = entityList.find((item) => item.id === id);

      if (!entity) {
        throw new Error("Entity not found");
      }

      const newEntity = {
        ...entity,
        name: `${entity.name}(dup)`,
        id: getRandomId(),
      };

      this.storage.setItem([newEntity, ...entityList]);

      return newEntity;
    });
  }

  async deleteEntity<TData extends { id: unknown }>(
    id: TData["id"],
  ): Promise<null> {
    return await this.request<null>(async () => {
      const entityList = this.storage.getItem<TData[]>();

      if (!entityList) {
        throw new Error("Entity not found");
      }

      this.storage.setItem(entityList.filter((entity) => entity.id !== id));

      return null;
    });
  }
}

export default EntityApiService;
