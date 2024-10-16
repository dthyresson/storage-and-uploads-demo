import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Demo from 'src/components/Demo'
import Demo6AttachmentsCell from 'src/components/Demo6AttachmentsCell'

const Demo6AttachmentsPage = () => {
  return (
    <>
      <Metadata
        title="Demo 6 Images or Documents"
        description="Demo 6 Images or Documents page"
      />

      <div className="container mx-auto px-4 py-8">
        <Demo index={6} />
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
