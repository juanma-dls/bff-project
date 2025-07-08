import { Products } from "./productInterface";

export interface SearchResponse {
  paging: {
    total: number;
    offset: number;
    limit: number;
  };
  categories?: unknown[];
  category?: {
    name: string;
  };
  items: Products[];
}