export type SortField = "price" | "rating";
export type SortOrder = "asc" | "desc";

export interface SearchParams {
  query: string;
  sortField?: SortField;
  sortOrder?: SortOrder;
  limit?: number;
  offset?: number;
}