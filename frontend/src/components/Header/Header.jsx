import Popover from '../Popover'
import { Link } from 'react-router-dom'
import Logo from '../../assets/imgs/Logo.png'
import NoProduct from '../../assets/imgs/NoProduct.png'
import path from '../../constants/path'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import { useMutation } from '@tanstack/react-query'
import { logoutAccount } from '../../apis/auth.api'
function Header() {
  //   const isActive = false
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  const purchasesIncart = 0
  return (
    <div className='mx-4 my-2'>
      <div className='mb-2'>
        <div className='flex justify-end'>
          <Popover
            className='flex translate-y-[3px] cursor-pointer items-center pt-1 pb-2 text-sm text-black hover:text-gray-500 md:text-xs'
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
                    className='block border-none bg-white py-3 px-4   text-left  text-black hover:text-cyan-500'
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link
                    to={path.cart}
                    className='block border-none bg-white py-3 px-4  text-left text-black hover:text-cyan-500'
                  >
                    Đơn mua{' '}
                  </Link>
                  <button
                    className='block border-none bg-white py-3 px-4   text-left text-black hover:text-cyan-500'
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              }
            >
              <div className='mr-2 h-6 w-6 flex-shrink-0 '>
                <img
                  src='https://scontent.fhan14-4.fna.fbcdn.net/v/t1.6435-1/99013175_1552654368248618_9221118823996850176_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=0xkxN2ODMsQAX88_YSP&_nc_ht=scontent.fhan14-4.fna&oh=00_AfB0mxLG5H8znvrd5I85hHVOoCC9yg2TRX9THTHVuKI5-w&oe=645F6E20'
                  alt='avatar'
                  className='h-full w-full rounded-full border-none object-cover'
                />
              </div>
              <div className='mr-4 flex-shrink-0 text-black'>{profile?.email}</div>
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
      <nav className='rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4'>
        <div className='container  grid grid-cols-12 '>
          <Link to={path.home} className='col-span-3 flex items-center'>
            <img src={Logo} className=' h-6 sm:h-9' alt=' Logo' />
          </Link>

          <form className='col-span-8 flex-grow sm:flex-shrink  sm:flex-grow-0 md:col-span-6 md:flex-shrink-0'>
            <div className='relative flex  rounded-sm bg-white p-1 text-sm'>
              <input
                type='text'
                placeholder='FREESHIP ĐƠN TỪ 0 ĐỒNG'
                className='flex-grow border-2 border-r-0 border-orange bg-transparent py-2 pl-2 pr-4 text-black outline-none'
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
                <div className='max-w-[400px] rounded-sm border-gray-100 bg-white text-sm shadow-md'>
                  {purchasesIncart > 0 ? (
                    <div className='items-center p-2'>
                      <div className='capitalize text-gray-400 opacity-70'>Sản phẩm mới thêm </div>
                      <div className='mt-5 '>
                        <div className='flex items-center pt-4 hover:bg-gray-100'>
                          <img
                            src='https://down-vn.img.susercontent.com/file/756c3dcdb55872c7c9787516162c9447_tn'
                            alt=''
                            className='flex h-11 w-11 flex-shrink-0 items-center object-cover'
                          />
                          <div className='mx-3 flex-grow overflow-hidden'>
                            <div className='truncate  text-base font-semibold'>Áo khoác nam</div>
                          </div>
                          <div className='ml-2 flex-shrink'>
                            <span className='text-sm text-orange '>450000đ</span>
                          </div>
                        </div>
                      </div>

                      <div className='my-5 flex justify-between '>
                        <div className='mt-2 items-center text-sm capitalize text-gray-600'>
                          5
                          {/* {purchasesIncart.length > MAX_Purchases ? purchasesIncart.length - MAX_Purchases : ''}
                            {''}thêm hàng vào giỏ{' '} */}
                        </div>
                        <div className='bg-orange hover:bg-opacity-80'>
                          <Link to='/cart' className='rounded-sm px-4 py-2 text-base text-white '>
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
              <Link to={path.home} className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-8 w-8 text-orange'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                {/* {purchasesIncart && purchasesIncart.length > 0 && (
                    <span className='absolute top-[-5px] left-[17px] rounded-full bg-white px-[9px] py-[1px] text-xs text-orange '>
                      {purchasesIncart?.length}
                    </span>
                  )} */}
              </Link>
            </Popover>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
