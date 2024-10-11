import { Link, routes } from '@redwoodjs/router'

type DemoLayoutProps = {
  children?: React.ReactNode
}

const DemoLayout = ({ children }: DemoLayoutProps) => {
  const demoCount = 6 // Set the number of demo pages here

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-gray-800 py-4 text-white">
        <nav className="container mx-auto px-4">
          <ul className="flex space-x-4">
            <li>
              <Link
                to={routes.home()}
                className="transition-colors hover:text-gray-300"
              >
                Home
              </Link>
            </li>
            {[...Array(demoCount)].map((_, index) => (
              <li key={index + 1}>
                <Link
                  to={routes[`demo${index + 1}`]()}
                  className="transition-colors hover:text-gray-300"
                >
                  Demo {index + 1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="container mx-auto flex-grow px-4 py-8">{children}</main>
      <footer className="bg-gray-800 py-4 text-white">
        <div className="container mx-auto px-4 text-center">
          &copy; {new Date().getFullYear()} Demo App
        </div>
      </footer>
    </div>
  )
}

export default DemoLayout
