import AsideFilter from './AsideFilter/AsideFilter'
import Product from './Product/Product'
import SoftProductList from './SoftProductList'
import productApi from '../../apis/products.api'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '../../hook/useQueryParams'
import Pagination from '../../components/Pagination'
import { useState } from 'react'
import { omitBy, isUndefined } from 'lodash'

function ProductList() {
  const queryParams = useQueryParams()
  const queryConfig = omitBy(
    {
      page: queryParams.page || '1',
      size: queryParams.size || 20,
      name: queryParams.name,
      order: queryParams.order,
      sort_by: queryParams.sort_by
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })

  console.log(queryConfig)

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>{<AsideFilter />}</div>
          <div className='col-span-9'>
            <SoftProductList />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
              {data &&
                data?.data?.items?.map((product, index) => (
                  <div className='col-span-1' key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
            <Pagination queryConfig={queryConfig} pageSize={15}></Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
