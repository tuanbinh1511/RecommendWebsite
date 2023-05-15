import AsideFilter from './AsideFilter/AsideFilter'
import Product from './Product/Product'
import SoftProductList from './SoftProductList'
import productApi from '../../apis/products.api'
import { useQuery } from '@tanstack/react-query'
import Pagination from '../../components/Pagination'
import categoryApi from '../../apis/category.api'
import { useQueryConfig } from '../../hook/useQueryConfig'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'

function ProductList() {
  const { isAuthenticated } = useContext(AppContext)
  console.log(isAuthenticated)
  const isLogin = isAuthenticated === false
  const queryConfig = useQueryConfig()

  const { data: ProductsNoLogin } = useQuery({
    queryKey: ['productsNologin', queryConfig, isAuthenticated],
    queryFn: async () => {
      return await productApi.getProductsNoLogin(queryConfig)
    },
    enabled: isLogin,
    keepPreviousData: true
  })
  const { data: ProductsUSerData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: async () => {
      return await productApi.getProducts(queryConfig)
    },
    keepPreviousData: true
  })
  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            {<AsideFilter categories={categoryData?.data?.categories} queryConfig={queryConfig} />}
          </div>
          <div className='col-span-9'>
            <SoftProductList queryConfig={queryConfig} pageSize={15} />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
              {ProductsUSerData && isAuthenticated
                ? ProductsUSerData?.data?.items?.map((product, index) => (
                    <div className='col-span-1' key={product.id}>
                      <Product product={product} />
                    </div>
                  ))
                : ProductsNoLogin?.data?.items?.map((product, index) => (
                    <div className='col-span-1' key={product.id}>
                      <Product product={product} />
                    </div>
                  ))}
              {/* {data &&
                data?.data?.items?.map((product, index) => (
                  <div className='col-span-1' key={product.id}>
                    <Product product={product} />
                  </div>
                ))} */}
            </div>
            <Pagination queryConfig={queryConfig} pageSize={15}></Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
