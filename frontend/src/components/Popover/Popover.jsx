import { offset, shift, useFloating } from '@floating-ui/react'
import { useInteractions } from '@floating-ui/react'
import { useHover, arrow } from '@floating-ui/react'
import { FloatingPortal } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useId } from 'react'

function Popover({ children, className, renderPopover, as: Element = 'div', initialOpen, placement = 'bottom-end' }) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef(null)
  const id = useId()
  const { x, y, strategy, refs, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(6),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  })
  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  const hover = useHover(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <Element
      className={className}
      ref={refs.setReference}
      {...getReferenceProps()}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
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
              transition={{ duration: 0.3 }}
              {...getFloatingProps()}
            >
              <span
                ref={arrowRef}
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
                className='absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-t-transparent border-b-white '
              ></span>
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}

export default Popover
