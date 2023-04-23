import Footer from '../../components/Footer'
import Header from '../../components/Header/Header'

function CartLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default CartLayout
