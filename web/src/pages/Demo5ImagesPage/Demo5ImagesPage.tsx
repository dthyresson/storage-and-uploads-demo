import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Demo5ImagesCell from 'src/components/Demo5ImagesCell'

const Demo5ImagesPage = () => {
  return (
    <>
      <Metadata title="Demo 5 Images" description="Demo 5 Images page" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Demo 5: Uploaded Images</h1>
        <p className="mb-6 text-gray-600">
          View the images uploaded and stored in the database
        </p>

        <div className="mb-8 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <Demo5ImagesCell />
        </div>

        <Link
          to={routes.demo5()}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Upload More Images
        </Link>
      </div>
    </>
  )
}

export default Demo5ImagesPage
