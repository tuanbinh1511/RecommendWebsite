import { inline, offset, shift, useClick, useFloating } from '@floating-ui/react'
import { useInteractions } from '@floating-ui/react'
import { flip } from '@floating-ui/dom'
import { FloatingPortal } from '@floating-ui/react'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useId } from 'react'
import Product from '../../pages/ProductList/Product'
import recommendApi from '../../apis/recommend.api'
import { useQuery } from '@tanstack/react-query'

function PopoverV2({ children, className, productId, as: Element = 'div', initialOpen, placement = 'bottom-end' }) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)

  const id = useId()
  const { x, y, strategy, refs, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [offset(10), shift(), inline(), flip()]
  })

  const click = useClick(context)
  const { data: recommendData } = useQuery({
    queryKey: ['recommend', productId],
    queryFn: () => recommendApi.getRecommend(productId)
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([click])
  return (
    <Element
      className={className}
      ref={refs.setReference}
      {...getReferenceProps()}
      //   onMouseEnter={showPopover}
      //   onMouseLeave={hidePopover}
    >
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0.05)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.4 }}
              {...getFloatingProps()}
            >
              {
                <div className='max-h-[300px]  w-[1200px]  bg-white'>
                  <div className=' grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7'>
                    {recommendData &&
                      recommendData?.data?.slice(0, 7).map((product) => (
                        <div className='col-span-1' key={product.id}>
                          <Product product={product} />
                        </div>
                      ))}
                  </div>
                </div>
              }
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}

export default PopoverV2
