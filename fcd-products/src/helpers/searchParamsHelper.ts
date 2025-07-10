import { SearchQueryParams } from "../interface/searchParamsInterface";

function parseSearchParams(query: Record<string, unknown>): SearchQueryParams {
  return {
    q: typeof query.q === 'string' ? query.q : undefined,
    minPrice: query.minPrice ? Number(query.minPrice) : 0,
    maxPrice: query.maxPrice ? Number(query.maxPrice) : 0
  }
}

export default parseSearchParams