import { faker } from "@faker-js/faker";
import { SearchResponse } from "../interface/searchResponseInterface";

export const generateSearchMockProducts = (): SearchResponse => {
  const products = Array.from({ length: 5 }).map((_, index) => ({
    id: String(index + 1),
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    picture: faker.image.urlLoremFlickr({ category: 'technics' }),
    price_with_discount: parseFloat((Math.random() * 100).toFixed(2)),
    rating: parseFloat((Math.random() * 5).toFixed(2)),
    free_shipping: faker.datatype.boolean(),
  }));

  return {
    paging: {
      total: products.length,
      offset: 0,
      limit: 5,
    },
    categories: ["mocked-category"],
    items: products,
  };
};

export const generateCategoryMockProducts = (): SearchResponse => {
  const products = Array.from({ length: 5 }).map((_, index) => ({
    id: String(index + 1),
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    picture: faker.image.urlLoremFlickr({ category: 'technics' }),
    price_with_discount: parseFloat((Math.random() * 100).toFixed(2)),
    rating: parseFloat((Math.random() * 5).toFixed(2)),
    free_shipping: faker.datatype.boolean(),
  }));

  return {
    paging: {
      total: products.length,
      offset: 0,
      limit: 5,
    },
    category: { name: "mocked-category"},
    items: products,
  };
};

export const generateDeleteMockProducts = () => {
  return {
    result: "ok",
    items_delete: faker.number.int({ min: 20, max: 30 })
  }
}
