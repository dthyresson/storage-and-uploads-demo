import { routes } from '@redwoodjs/router'

export const demos = [
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
    title: 'Demo 3: Content Transformation and File Storage',
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
]
