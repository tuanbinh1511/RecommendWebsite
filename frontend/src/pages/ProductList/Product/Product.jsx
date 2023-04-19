import { Link } from 'react-router-dom'
import path from '../../../constants/path'
import { formatCurrency, formatNumberToSocial } from '../../../utils/utils'

function Product({ product }) {
  return (
    <Link to={`${path.home}${product.id}`}>
      {/* {`${path.home}${generateNameId({ name: product.name, id: product._id })}`} */}
      <div className='overflow-hidden rounded-2xl bg-white shadow-lg transition-transform duration-100 hover:translate-y-[-0.03rem] hover:border-[1px] hover:border-orange hover:shadow-lg'>
        <div className='relative mx-auto my-2 w-[90%] overflow-hidden rounded-xl bg-slate-200 pt-[100%]  '>
          <img
            src={product?.imgurl}
            alt={product?.name}
            className='absolute top-[10px] left-[9px]  h-[90%] w-[90%]  rounded-xl object-center duration-200 hover:top-0 hover:left-0 hover:h-[100%] hover:w-[100%]'
          />
        </div>
        <div className='mx-2 mt-2 overflow-hidden'>
          <div className=' min-h-[2rem] text-sm font-medium  line-clamp-2 '>{product?.name}</div>
          <div className='flex flex-shrink-0 pt-4'>
            <span className='flex items-center text-sm'>₫</span>
            <span className='mr-1 text-base text-gray-600 line-through'>{formatCurrency(product?.old_price)} </span>-
            <span className='ml-1 flex items-center text-sm text-orange'>₫</span>
            <span className=' text-base  text-orange  '>{formatCurrency(product?.price)}</span>
          </div>
          <div className='mt-3 mb-8 flex items-center justify-end'>
            <div className='mx-2 text-sm text-slate-500'>
              <span>{formatNumberToSocial(product?.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
