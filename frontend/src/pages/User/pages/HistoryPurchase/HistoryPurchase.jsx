import { Link, useNavigate } from 'react-router-dom'
import path from '../../../../constants/path'
import { ArrReverse, convertTime, formatCurrency } from '../../../../utils/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from '../../../../apis/user.api'
import cartApi from '../../../../apis/cart.api'

function HistoryPurchase() {
  const { data: historyPurchase } = useQuery({
    queryKey: ['historyPurchase'],
    queryFn: userApi.historyPurchase,
    onSuccess: () => {}
  })
  const navigate = useNavigate()
  const addToCartMutation = useMutation(cartApi.addtoCart)

  const handleBuy = async (productId) => {
    await addToCartMutation.mutateAsync({ product_id: productId.toString(), buy_count: 1 })
    navigate(path.cart, {
      state: {
        purchaseId: productId
      }
    })
  }

  const historyPurchaseData = ArrReverse(historyPurchase?.data)
  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{}</div>
          <div>
            <div className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
              {historyPurchaseData?.map((history) => (
                <div key={history.id}>
                  <div className='font-semibold text-orange'>{convertTime(history.created_at)}</div>
                  {history?.order_detail?.map((purchase) => (
                    <div
                      key={purchase.product_id}
                      className='my-2 rounded-md border-[1px] border-gray-200 text-base shadow-lg'
                    >
                      <Link
                        to={`${path.home}${purchase.product_id}`}
                        className='flex items-center border-[1px] border-slate-200 p-2 '
                      >
                        <div className='flex-shrink-0  '>
                          <img className='h-20 w-20 object-cover' src={purchase.prd_inf.imgurl} alt='' />
                        </div>
                        <div className='ml-3 mr-4 flex-grow overflow-hidden pl-2 pr-8'>
                          <div className='truncate '>{purchase.prd_inf.name}</div>
                          <div className='mt-3 text-lg font-bold text-orange'>x{purchase.quantity}</div>
                        </div>
                        <div className='ml-3 flex-shrink-0 '>
                          <span className='truncate text-gray-500 line-through'>
                            ₫{formatCurrency(purchase.prd_inf.old_price)}
                          </span>
                          <span className='ml-2 truncate text-orange'>₫{formatCurrency(purchase.prd_inf.price)}</span>
                        </div>
                      </Link>
                      {/* <div className='h-[1px] w-full bg-slate-300'></div> */}
                      <div className='flex justify-end py-1'>
                        <div>
                          <span>Thành tiền : </span>
                          <span className='ml-2 mr-2 mb-2 text-lg font-bold text-orange'>
                            ₫{formatCurrency(purchase.prd_inf.price * purchase.quantity)}
                          </span>
                        </div>
                      </div>
                      <div className='flex justify-end py-1'>
                        <button
                          className='mt-5 mr-2 mb-3 flex h-10 w-44  items-center justify-center bg-orange text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                          onClick={() => handleBuy(purchase.product_id)}
                        >
                          Mua lại
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPurchase
