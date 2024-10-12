import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Demo from 'src/components/Demo'
import Demo7AttachmentsCell from 'src/components/Demo7AttachmentsCell'

const Demo7AttachmentsPage = () => {
  return (
    <>
      <Metadata
        title="Demo 7 Images or Documents to S3"
        description="Demo 7 Images or Documents to S3 page"
      />

      <div className="container mx-auto px-4 py-8">
        <Demo index={7} />
        <div className="mb-8 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <Demo7AttachmentsCell />
        </div>

        <Link
          to={routes.demo7()}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Upload More Images or Documents
        </Link>
      </div>
    </>
  )
}

export default Demo7AttachmentsPage
