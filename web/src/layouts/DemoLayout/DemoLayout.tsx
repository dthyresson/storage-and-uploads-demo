import { Link, NavLink, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { demos } from 'src/demos'

type DemoLayoutProps = {
  children?: React.ReactNode
}

const DemoLayout = ({ children }: DemoLayoutProps) => {
  const { isAuthenticated, logOut } = useAuth()
  return (
    <div className="flex min-h-screen flex-col">
      <Toaster />

      <header className="bg-gray-800 py-4 text-white">
        <nav className="container mx-auto flex justify-between px-4">
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to={routes.home()}
                className="hover:text-gray-300"
                activeClassName="text-gray-300 underline"
              >
                Home
              </NavLink>
            </li>
            {demos.map((demo, index) => (
              <li key={index + 1}>
                <NavLink
                  to={demo.route()}
                  className="hover:text-gray-300"
                  activeClassName="text-gray-300 underline"
                >
                  Demo {index + 1}
                </NavLink>
              </li>
            ))}
          </ul>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome!</span>
              <button
                className="rounded bg-red-600 px-3 py-1 text-sm font-medium transition duration-150 ease-in-out hover:bg-red-700"
                onClick={() => logOut()}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to={routes.login()}
              className="rounded bg-blue-600 px-3 py-1 text-sm font-medium transition duration-150 ease-in-out hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </nav>
      </header>
      <main className="container mx-auto flex-grow px-4 py-8">{children}</main>
      <footer className="bg-gray-800 py-4 text-white">
        <div className="container mx-auto px-4 text-center">
          Storage and Uploads Demo for RedwoodJS
        </div>
      </footer>
    </div>
  )
}

export default DemoLayout
