import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

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
          {[
            {
              route: routes.demo1(),
              title: 'Demo 1: File Upload and Validation',
              description:
                'Handles file uploads, validates input, and returns file metadata.',
            },
            {
              route: routes.demo2(),
              title: 'Demo 2: Content Transformation and Storage',
              description:
                'Transforms input content to uppercase and stores it using a storage service as data.',
            },
            {
              route: routes.demo3(),
              title: 'Demo 3',
              description:
                'Transforms input content to uppercase and stores it using a storage service as a file.',
            },
            {
              route: routes.demo4(),
              title: 'Demo 4: Multiple File Uploads',
              description:
                'Uploads multiple images files and returns their metadata and a url to the image for use in an image tag.',
            },
            {
              route: routes.demo5(),
              title: 'Demo 5: File Uploads with Storage and Prisma Reference',
              description:
                'Uploads a file and returns the file metadata and a Prisma reference to the file.',
            },
            {
              route: routes.demo6(),
              title:
                'Demo 6: File Uploads with Storage, Prisma Reference, and Upload Token',
              description:
                'Uploads a file and returns the file metadata and a Prisma reference to the file.',
            },
            {
              route: routes.demo7Attachments(),
              title: 'Demo 7: Uploaded Images or Documents to S3',
              description: 'Uploads images or documents to S3.',
            },
          ].map((demo, index) => (
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
