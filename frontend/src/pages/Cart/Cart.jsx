import { useMutation, useQuery } from '@tanstack/react-query'
import cartApi from '../../apis/cart.api'
import { Link } from 'react-router-dom'
import path from '../../constants/path'
import { formatCurrency } from '../../utils/utils'
import QuantityController from '../../components/QuantityController/QuantityController'
import Button from '../../components/Button/Button'
import { useEffect, useState } from 'react'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import PopoverV2 from '../../components/PopoverV2/PopoverV2'
import { toast } from 'react-toastify'

export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState([])
  const { data: cartListData, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: () => {
      return cartApi.getCartList()
    },
    onSuccess: () => {}
  })
  const updateCartMutaion = useMutation({
    mutationFn: cartApi.updateCart,
    onSuccess: () => {
      refetch()
    }
  })
  const deleteCartMutaion = useMutation({
    mutationFn: cartApi.deleteCart,
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {
      console.log({ error })
    }
  })
  const buyProductMutation = useMutation({
    mutationFn: cartApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success('Bạn đã mua hàng thành công!', {
        position: 'top-right',
        autoClose: 2000
      })
    }
  })
  const purchasesInCart = cartListData?.data.items
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked)
  const checkedPurchaseLength = checkedPurchases.length
  const totalPurchaseChecked = checkedPurchases.reduce((result, current) => {
    return result + current?.product_quantity * current?.price
  }, 0)
  const totalPurchaseDiscountChecked = checkedPurchases.reduce((result, current) => {
    return result + current?.product_quantity * (current?.old_price - current?.price)
  }, 0)
  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObj = keyBy(prev, 'product_id')
      return (
        purchasesInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedPurchasesObj[purchase.product_id]?.checked)
        })) || []
      )
    })
  }, [purchasesInCart])

  const handleTypeQuantity = (purchaseIndex) => (value) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].product_quantity = value
      })
    )
  }
  const handleQuantity = (purchaseIndex, value, enable) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updateCartMutaion.mutate({ product_id: purchase.product_id, buy_count: value })
    }
  }
  const handleDelete = async (purchaseIndex) => {
    const item_id = extendedPurchases[purchaseIndex]?.product_id
    await deleteCartMutaion.mutateAsync({ item_id })
  }
  const handleDeleteManyPurchase = () => {
    const item_id = checkedPurchases.map((purchase) => purchase?.product_id)
    deleteCartMutaion.mutate({ item_id })
  }
  const handleCheck = (purchaseIndex) => (event) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const handleBuy = () => {
    if (checkedPurchaseLength > 0) {
      const ids = checkedPurchases.map((purchase) => purchase.product_id)
      buyProductMutation.mutate(ids)
    }
  }
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className=' min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm font-semibold capitalize  text-gray-700 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            <div className='  my-3 rounded-sm bg-white p-5 font-medium text-gray-500 shadow'>
              {extendedPurchases?.map((purchase, index) => (
                <div
                  key={purchase?.product_id}
                  className=' mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                >
                  <div className=' col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={purchase?.checked}
                          onChange={handleCheck(index)}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex items-center overflow-hidden'>
                          <Link
                            className='h-20 w-20 flex-shrink-0 items-center object-cover'
                            to={`${path.home}$
                              id: purchase.product.id
                            })}`}
                          >
                            <img alt={purchase?.product_name} src={purchase?.product_image} />
                          </Link>
                          <div className='flex-grow  px-2 pt-1 pb-2 '>
                            <Link
                              to={`${path.home}$
                                id: purchase.product.id
                              `}
                              className='line-clamp-2'
                            >
                              {purchase?.product_name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>₫{formatCurrency(purchase?.old_price)}</span>
                          <span className='ml-3'>₫{formatCurrency(purchase?.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={1000}
                          value={purchase?.product_quantity}
                          className='flex items-center'
                          onIncrease={(value) => handleQuantity(index, value, value < 1000)}
                          onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                          onType={handleTypeQuantity(index)}
                          onFocusOut={(value) =>
                            handleQuantity(
                              index,
                              value,
                              value < 1000 && value > 0 && value !== purchasesInCart[index]?.product_quantity
                            )
                          }
                          disabled={purchase.disabled}
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange'>
                          ₫{formatCurrency(purchase?.price * purchase?.product_quantity)}
                        </span>
                      </div>
                      <div className=' col-span-1'>
                        <button
                          className='bg-none text-black transition-colors hover:text-orange'
                          onClick={() => handleDelete(index)}
                        >
                          Xóa
                        </button>
                        {purchase.checked && (
                          <PopoverV2 className=' bg-none text-black  hover:text-orange' productId={purchase.product_id}>
                            Tìm sản phẩm tương tự
                          </PopoverV2>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange'
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
            </div>
            <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
              Chọn tất cả ({checkedPurchaseLength})
            </button>
            <button className='mx-3 border-none bg-none' onClick={handleDeleteManyPurchase}>
              Xóa
            </button>
          </div>

          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán (sản phẩm):</div>
                <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalPurchaseChecked)}</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>₫{formatCurrency(totalPurchaseDiscountChecked)}</div>
              </div>
            </div>
            <Button
              className='mt-5 flex h-10 w-52 items-center justify-center bg-orange text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
              onClick={handleBuy}
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
