export type SortField = "price" | "rating";
export type SortOrder = "asc" | "desc";

export interface SearchParams {
  query: string;
  sortBy?: SortField;
  order?: SortOrder;
  limit?: number;
  offset?: number;
}
