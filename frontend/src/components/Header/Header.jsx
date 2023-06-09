import Popover from '../Popover'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Logo from '../../assets/imgs/Logo.png'
import NoProduct from '../../assets/imgs/NoProduct.png'
import noAvartar from '../../assets/imgs/noAvartar.png'
import LogoDtu from '../../assets/imgs/LogoDtu.png'
import path from '../../constants/path'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../context/app.context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { logoutAccount } from '../../apis/auth.api'
import { useQueryConfig } from '../../hook/useQueryConfig'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { schema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import cartApi from '../../apis/cart.api'
import { ArrReverse, formatCurrency } from '../../utils/utils'
import userApi from '../../apis/user.api'

const keywordSchema = schema.pick(['keyword'])

const MAX_Purchases = 5

function Header() {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)

  const queryClient = useQueryClient()
  const { data: profileData } = useQuery({
    queryKey: ['profile', isAuthenticated],
    queryFn: userApi.getProfile,
    onSuccess: () => {
      setProfile(profileData?.data[0])
    }
  })

  const isLogin = isAuthenticated === true
  useEffect(() => {
    setProfile(profileData?.data[0])
    // setProfileFromLS(profileData?.data[0])
  }, [isLogin])

  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      keyword: ''
    },
    resolver: yupResolver(keywordSchema)
  })
  const navigate = useNavigate()
  const logoutMutation = useMutation({
    mutationFn: logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['cart'] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  const onSubmitSearch = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit({
          ...queryConfig,
          keyword: data.keyword.toString()
        })
      ).toString()
    })
  })

  const { data: cartListData } = useQuery({
    queryKey: ['cart'],
    queryFn: () => {
      return cartApi.getCartList()
    },
    enabled: isAuthenticated,
    onSuccess: () => {}
  })
  const purchasesIncart = ArrReverse(cartListData?.data.items)

  return (
    <div className=' bg-orange'>
      <div className='mb-2'>
        <div className='flex justify-end'>
          <Popover
            className='flex translate-y-[3px] cursor-pointer items-center pt-1 pb-2 text-sm text-black hover:text-white md:text-xs'
            renderPopover={
              <div className='relative rounded-sm border-gray-100 bg-white shadow-md '>
                <div className='flex flex-col py-2 px-3 pr-16'>
                  <button className='py-3 px-2 text-xs hover:text-orange'>Tiếng Việt</button>
                  <button className='py-2 px-2 text-xs hover:text-orange'>English</button>
                </div>
              </div>
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1 md:text-xs'>Tiếng Việt</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </Popover>
          {isAuthenticated && (
            <Popover
              className='ml-6 flex cursor-pointer items-center pt-1 pb-2 text-black hover:text-gray-100 md:text-xs'
              renderPopover={
                <div className='rounded-sm border-gray-100 bg-white shadow-md'>
                  <Link
                    to={path.profile}
                    className='block border-none bg-white py-3 px-4   text-left  text-black hover:text-orange'
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link
                    to={path.cart}
                    className='block border-none bg-white py-3 px-4  text-left text-black hover:text-orange'
                  >
                    Giỏ Hàng{' '}
                  </Link>
                  <button
                    className='block border-none bg-white py-3 px-4   text-left text-black hover:text-orange'
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              }
            >
              <div className='mr-2 h-6 w-6 flex-shrink-0 '>
                {isAuthenticated ? (
                  <img src={LogoDtu} alt='avatar' className='h-full w-full rounded-full border-none object-cover' />
                ) : (
                  <img src={noAvartar} alt='avatar' className='h-full w-full rounded-full border-none object-cover' />
                )}
              </div>
              <div className='mr-4 flex-shrink-0 font-medium text-white hover:text-gray-200'>{profile?.name}</div>
            </Popover>
          )}
          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link
                to={path.register}
                className='mx-3 capitalize hover:text-red-500 hover:opacity-80 md:text-xs md:hover:animate-bounce'
              >
                Đăng ký
              </Link>
              <div className='h-5 translate-y-[2px] rotate-[20deg] border-r-[1px] border-gray-500'></div>
              <Link
                to={path.login}
                className='mx-3 capitalize hover:text-red-500 hover:opacity-80 md:text-xs md:hover:animate-bounce'
              >
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
      </div>
      <nav className='rounded border-gray-200 bg-orange px-2 py-2.5 dark:bg-gray-900 sm:px-4'>
        <div className='container  grid grid-cols-12 '>
          <Link to={path.home} className='col-span-3 flex items-center'>
            <img src={Logo} className=' h-6 sm:h-9' alt=' Logo' />
          </Link>

          <form
            className='col-span-8 flex-grow sm:flex-shrink  sm:flex-grow-0 md:col-span-6 md:flex-shrink-0'
            onSubmit={onSubmitSearch}
          >
            <div className='relative flex  rounded-sm bg-white p-1 text-sm'>
              <input
                type='text'
                placeholder='FREESHIP ĐƠN TỪ 0 ĐỒNG'
                className='flex-grow  border-orange bg-transparent py-2 pl-2 pr-4 text-black outline-none'
                {...register('keyword')}
              />
              <button className='flex-shrink-0 rounded-sm bg-orange py-2 px-4 hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5 text-white'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className=' col-span-1 items-center sm:justify-start md:col-span-3 md:flex md:justify-end'>
            <Popover
              className='hover:animate-wiggle ml-6 flex cursor-pointer items-center pt-1 pb-2 text-white hover:text-gray-100'
              renderPopover={
                <div className='max-h-[400px] max-w-[400px] rounded-sm border-gray-100 bg-white text-sm shadow-md'>
                  {purchasesIncart && purchasesIncart.length > 0 ? (
                    <div className='p-2'>
                      <div className='capitalize text-gray-400 opacity-70'>Sản phẩm mới thêm </div>
                      <div className='mt-5 '>
                        {purchasesIncart.slice(0, MAX_Purchases).map((purchase) => (
                          <div className='flex pt-4  hover:bg-gray-100' key={purchase.product_id}>
                            <img
                              src={purchase.product_image}
                              alt={purchase.product_name}
                              className='flex h-11 w-11 flex-shrink-0 items-center object-cover'
                            />
                            <div className='mx-3 flex-grow overflow-hidden'>
                              <div className='truncate  text-base font-semibold'>{purchase.product_name}</div>
                            </div>
                            <div className='ml-2 flex-shrink'>
                              <span className='text-sm text-orange '>₫{formatCurrency(purchase.product_price)}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className='my-5 flex justify-between '>
                        <div className='mt-2 items-center text-sm capitalize text-gray-600'>
                          {purchasesIncart.length > MAX_Purchases ? purchasesIncart.length - MAX_Purchases : ''}
                          {''}thêm hàng vào giỏ{' '}
                        </div>
                        <div className='bg-orange hover:bg-opacity-80'>
                          <Link to={path.cart} className='rounded-sm px-4 py-2 text-base text-white '>
                            {' '}
                            Xem giỏ hàng
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
                      <img src={NoProduct} alt='' className=' max-h-20 max-w-[80px] flex-grow' />
                      <div className=' text-base capitalize leading-6'>Chưa có sản phẩm</div>
                    </div>
                  )}
                </div>
              }
            >
              <Link to={path.cart} className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-8 w-8 text-white'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                {purchasesIncart && purchasesIncart.length > 0 && (
                  <span className='absolute top-[-5px] left-[17px] rounded-full bg-white px-[9px] py-[1px] text-xs text-orange '>
                    {purchasesIncart?.length}
                  </span>
                )}
              </Link>
            </Popover>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
