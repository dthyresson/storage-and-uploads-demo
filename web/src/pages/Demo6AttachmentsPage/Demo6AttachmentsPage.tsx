import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Demo6AttachmentsCell from 'src/components/Demo6AttachmentsCell'

const Demo6AttachmentsPage = () => {
  return (
    <>
      <Metadata
        title="Demo 6 Images or Documents"
        description="Demo 6 Images or Documents page"
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">
          Demo 6: Uploaded Images or Documents
        </h1>
        <p className="mb-6 text-gray-600">
          View the images or documents uploaded and stored in the database with
          Upload Token verification
        </p>

        <div className="mb-8 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <Demo6AttachmentsCell />
        </div>

        <Link
          to={routes.demo6()}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Upload More Images or Documents
        </Link>
      </div>
    </>
  )
}

export default Demo6AttachmentsPage
