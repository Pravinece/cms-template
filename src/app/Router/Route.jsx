import { lazy, Suspense, React } from 'react'
import { createBrowserRouter, Navigate, RouterProvider, redirect } from 'react-router-dom'
import { PathGuard } from '../../components/helper/RoleGuard'
import HeroPage from '../../pages/HeroPage/HeroPage'
import { getSecureToken, setSecureUser, setSecureToken, getSecureUser } from '../../lib/cookieAuth'
import instance from '../../utils/service'

const LoginPage = lazy(() => import('../../pages/Login/Login'))
const DashboardPage = lazy(() => import('../../pages/Dashboard/Dashboard'))
const UsersPage = lazy(() => import('../../pages/Users/User'))
const AdminPage = lazy(() => import('../../pages/Admin/Admin'))

function Spinner() {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full" />
      </div>
    )
  }
  
function S(Component) {
    return (
      <Suspense fallback={<Spinner />}>
        <Component />
      </Suspense>
    )
  }

  const BASE = import.meta.env.VITE_APP;

  function AuthGuard({ children }) {
    const isAuth         = getSecureUser()
    // const isAuth         = getSecureToken()

    if (!isAuth) return <Navigate to={`login`} replace />
    return children
  }

const router = createBrowserRouter([
    {
      path: '/login',
      element: S(LoginPage),
    },
    {
      path: '/',
      element: <AuthGuard><HeroPage /></AuthGuard>,
      children: [
        { index: true, element: S(DashboardPage) },
        {
          path: 'users',
          element: <PathGuard >{S(UsersPage)}</PathGuard>,
        },
        {
          path: 'admin',
          element: <PathGuard>{S(AdminPage)}</PathGuard>,
        },
        { path: '403', element: <Navigate to="/" replace /> },
      ],
    },
    {
      path: '*',
      element: (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
          <div className="text-center">
            <p className="text-8xl font-black text-gray-200 dark:text-gray-800">404</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">Page not found</h1>
            <a href={`/${BASE}`} className="mt-6 inline-block px-6 py-2.5 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700">
              Back to Dashboard
            </a>
          </div>
        </div>
      ),
    },
  ], { basename: `/${BASE}` })
  
  export default function Route() {
    return <RouterProvider router={router} />
  }
