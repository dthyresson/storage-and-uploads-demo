import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import Demo from 'src/components/Demo'
import Demo5AttachmentsCell from 'src/components/Demo5AttachmentsCell'

const Demo5AttachmentsPage = () => {
  return (
    <>
      <Metadata
        title="Demo 5 Attachments"
        description="Demo 5 Attachments page"
      />

      <div className="container mx-auto px-4 py-8">
        <Demo index={5} />

        <div className="mb-8 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <Demo5AttachmentsCell />
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

export default Demo5AttachmentsPage
