export interface Products {
  id: string;
  title: string;
  category?: string;
  price: number;
  picture: string;
  price_with_discount: number;
  rating: number;
  free_shipping: boolean;
}