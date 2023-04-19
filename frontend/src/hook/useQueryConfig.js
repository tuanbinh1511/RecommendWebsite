import { isUndefined, omitBy } from 'lodash'
import useQueryParams from './useQueryParams'

export function useQueryConfig() {
  const queryParams = useQueryParams()
  const queryConfig = omitBy(
    {
      page: queryParams.page || '1',
      size: queryParams.size || 20,
      keyword: queryParams.keyword,
      order: queryParams.order || '',
      sortby: queryParams.sortby || 'createdAt',
      cat: queryParams.cat,
      minprice: queryParams.minprice,
      maxprice: queryParams.maxprice
    },
    isUndefined
  )
  return queryConfig
}
