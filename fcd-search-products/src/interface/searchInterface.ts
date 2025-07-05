export interface SearchResponse {
  paging: {
    total: number;
    offset: number;
    limit: number;
  };
  categories: unknown[];
  items: Array<{
    id: string;
    title: string;
    price: number;
    picture: string;
    price_with_discount: number;
    rating: number;
    free_shipping: boolean;
  }>;
};