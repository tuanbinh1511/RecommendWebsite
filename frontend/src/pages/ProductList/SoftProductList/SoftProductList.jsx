import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from '../../../constants/path'
import { omit } from 'lodash'

function SoftProductList({ queryConfig, pageSize }) {
  const { sortby, order, page } = queryConfig
  const Page = Number(page)
  const isActiveSortBy = (sortbyValue) => {
    return sortby === sortbyValue.toString()
  }

  const navigate = useNavigate()
  const handleSort = (sortbyValue) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sortby: sortbyValue.toString()
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue) => {
    console.log(orderValue)
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sortby: 'price',
        order: orderValue.toString()
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='font-semibold'>Sắp xếp theo</div>
          <button
            className={classNames('h-10   rounded-md px-4 text-center font-semibold capitalize hover:opacity-80', {
              'animate-pulse bg-orange text-white ': isActiveSortBy('createdAt'),
              'bg-gray-400/40 text-black hover:bg-slate-300': !isActiveSortBy('createdAt')
            })}
            onClick={() => handleSort('')}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-10 rounded-md   px-4 text-center font-semibold capitalize hover:opacity-80 ', {
              'animate-pulse bg-orange text-white': isActiveSortBy('price'),
              'bg-gray-400/40 text-black hover:bg-slate-300': !isActiveSortBy('price')
            })}
            onClick={() => handleSort('price')}
          >
            Xu Hướng
          </button>
          <button
            className={classNames('h-10  rounded-md px-4 text-center font-semibold capitalize hover:opacity-80 ', {
              'animate-pulse bg-orange text-white': isActiveSortBy('sales'),
              'bg-gray-400/40 text-black hover:bg-slate-300': !isActiveSortBy('sales')
            })}
            onClick={() => handleSort('sales')}
          >
            Bán chạy
          </button>
          <select
            className={classNames('h-8  px-4 text-left text-sm capitalize  outline-none ')}
            value={order || ''}
            onChange={(e) => handlePriceOrder(e.target.value)}
          >
            <option disabled className='bg-white text-black' value=''>
              Giá
            </option>
            <option className={classNames('h-8  px-4 text-left text-sm capitalize  outline-none ')} value='acs'>
              Giá: Thấp đến cao
            </option>
            <option className={classNames('h-8  px-4 text-left text-sm capitalize  outline-none ')} value='decs'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {Page === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (Page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
            {Page === pageSize ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (Page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoftProductList
