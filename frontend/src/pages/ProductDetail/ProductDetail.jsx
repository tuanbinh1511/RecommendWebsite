import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from '../../apis/products.api'
import { formatCurrency, formatNumberToSocial, rateSale } from '../../utils/utils'
import Product from '../ProductList/Product'
import { useRef, useState } from 'react'
import QuantityController from '../../components/QuantityController/QuantityController'
import cartApi from '../../apis/cart.api'
import recommendApi from '../../apis/recommend.api'
import { toast } from 'react-toastify'
import path from '../../constants/path'

export default function ProductDetail() {
  const queryClient = useQueryClient()

  const { id } = useParams()
  const navigate = useNavigate()
  const [buyCount, setBuyCount] = useState(1)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id)
  })
  const product = productDetailData?.data
  const { data: recommendData } = useQuery({
    queryKey: ['recommend', id],
    queryFn: () => recommendApi.getRecommend(id)
  })
  const buyProductMutation = useMutation({
    mutationFn: cartApi.buyProducts,
    onSuccess: (data) => {
      toast.success('Bạn đã mua hàng thành công!', {
        position: 'top-right',
        autoClose: 2000
      })
    }
  })

  const imageRef = useRef(null)
  const handleBuyCount = (value) => {
    setBuyCount(value)
  }
  // Add to cart

  const addToCartMutation = useMutation(cartApi.addtoCart)
  const addToCart = () => {
    addToCartMutation.mutate(
      { product_id: product?.id.toString(), buy_count: buyCount },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error) => {}
      }
    )
  }
  const handleBuy = async () => {
    const res = await addToCartMutation.mutateAsync({ product_id: product?.id.toString(), buy_count: buyCount })
    const purchase = res?.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase.product_id
      }
    })
  }
  //Xử lí zoom ảnh
  const handleZoom = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const image = imageRef.current
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = e.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleRemoveZoom = (e) => {
    imageRef.current.removeAttribute('style')
  }
  if (!product) return null
  return (
    <div className='bg-slate-200 '>
      <div className='bg-slate-50 p-6 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={product?.imgurl}
                  alt={product?.name}
                  ref={imageRef}
                  className='pointer-events-none absolute top-0 left-0 h-[100%] w-[100%] object-cover'
                />
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product?.name}</h1>
              <div className='mt-8 flex items-center'>
                {/* <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassname='fill-orange text-orange h-4 w-4'
                    nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div> */}
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocial(product?.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-slate-200 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product?.old_price)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product?.old_price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product?.old_price, product?.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                  onClick={addToCart}
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  className='fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                  onClick={handleBuy}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='mt-8'>
          <div className=' text-lg uppercase text-gray-500'>Sản phẩm đề xuất dành cho bạn </div>
          <div className='mt-6 grid grid-cols-3 gap-2 md:grid-cols-5 lg:grid-cols-6'>
            {recommendData &&
              recommendData?.data?.map((product) => (
                <div className='col-span-1' key={product.id}>
                  <Product product={product} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
