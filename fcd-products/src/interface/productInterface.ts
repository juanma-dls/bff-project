export interface Products {
  id: string;
  title: string;
  category?: string;
  price: number;
  thumbnail: string;
  discountPercentage: number;
  rating: number;
  free_shipping: boolean;
}