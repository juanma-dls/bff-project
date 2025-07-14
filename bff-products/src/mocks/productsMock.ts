export const mockedProductsResponse = {
  paging: {
    total: 2,
    offset: 0,
    limit: 10,
  },
  categories: ["smartphones"],
  items: [
    {
      id: 1,
      title: "Mocked iPhone",
      price: 1000,
      price_with_discount: 900,
      picture: "mock-thumbnail.jpg",
      rating: 4.8,
      free_shipping: false,
    },
    {
      id: 2,
      title: "Mocked Samsung",
      price: 800,
      price_with_discount: 850,
      picture: "mock-thumbnail.jpg",
      rating: 4.8,
      free_shipping: true,
    },
  ],
};

export const mockedProductsByCategoryResponse = {
  paging: {
    total: 2,
    offset: 0,
    limit: 10,
  },
  items: [
    {
      id: 1,
      title: "Mocked iPhone",
      price: 1000,
      category: "smartphones",
      price_discount: 100,
      picture: "mock-thumbnail.jpg",
      rating: 4.8,
      free_shipping: false,
    },
    {
      id: 2,
      title: "Mocked Samsung",
      price: 800,
      category: "smartphones",
      price_discount: 50,
      picture: "mock-thumbnail.jpg",
      rating: 4.8,
      free_shipping: true,
    },
  ],
};
