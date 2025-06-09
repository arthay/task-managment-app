export interface I_PaginatorInfo {
  page: number;
  hasNextPage: boolean;
  total: number;
}

export interface I_QueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface I_ListResponse<TData> {
  entities: TData[];
  paginatorInfo: I_PaginatorInfo;
}

export type T_SortOrder = "asc" | "desc";
