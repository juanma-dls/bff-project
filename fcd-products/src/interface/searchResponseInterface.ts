import { ProductItem } from "./productItemInterfase";

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
  items: ProductItem[];
}