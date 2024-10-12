import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Demo7AttachmentsCell from 'src/components/Demo7AttachmentsCell'

const Demo7AttachmentsPage = () => {
  return (
    <>
      <Metadata
        title="Demo 7 Images or Documents to S3"
        description="Demo 7 Images or Documents to S3 page"
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">
          Demo 7: Uploaded Images or Documents to S3
        </h1>
        <p className="mb-6 text-gray-600">
          View the images or documents uploaded and stored in S3 with Upload
          Token verification and Prisma reference to the S3.
        </p>

        <div className="mb-8 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <Demo7AttachmentsCell />
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

export default Demo7AttachmentsPage
