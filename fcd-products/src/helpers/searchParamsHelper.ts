import { SearchParams } from "../interface/searchParamsInterface";

function parseSearchParams(query: any): SearchParams {
  return {
    category: typeof query.category === 'string' ? query.category : undefined,
    minPrice: query.minPrice ? Number(query.minPrice) : 0,
    maxPrice: query.maxPrice ? Number(query.maxPrice) : 0,
    title: typeof query.title === 'string' ? query.title : undefined,
  }
}

export default parseSearchParams