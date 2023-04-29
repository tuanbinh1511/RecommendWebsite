import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from '../src/layouts/MainLayout'
import Login from './pages/Login/Login'
import ProductList from './pages/ProductList'
import LoginLayout from './layouts/LoginLayout'
import Register from './pages/Register'
import path from '././constants/path'
import { useContext } from 'react'
import { AppContext } from './context/app.context'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout/CartLayout'
import UserLayout from './pages/User/layouts/UserLayout/UserLayout'
import ChangePassword from './pages/User/pages/ChangePassword/ChangePassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchase/HistoryPurchase'
import Profile from './pages/User/pages/Profile/Profile'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <LoginLayout>
              <Login />
            </LoginLayout>
          )
        },
        {
          path: path.register,
          element: (
            <LoginLayout>
              <Register />
            </LoginLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          index: true,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            }
          ]
        }
      ]
    },

    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
