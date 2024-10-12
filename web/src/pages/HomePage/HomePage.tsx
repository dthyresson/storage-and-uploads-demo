import { Link } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { demos } from 'src/demos'
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Metadata
        title="Storage and Uploads Demos"
        description="Demos for using Storage and Uploads"
      />

      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Storage and Uploads Demos
        </h1>
        <ul className="space-y-6">
          {demos.map((demo, index) => (
            <li
              key={index}
              className="overflow-hidden rounded-lg bg-white shadow"
            >
              <Link
                to={demo.route}
                className="block transition duration-150 ease-in-out hover:bg-gray-50"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {demo.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {demo.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HomePage
