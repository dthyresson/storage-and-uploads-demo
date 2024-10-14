import { routes } from '@redwoodjs/router'

export const demos = [
  {
    route: () => routes.demo1(),
    title: 'Demo 1: Basic File Upload',
    description:
      'Upload an image using GraphQL and returns the file metadata (type, size, name).',
    tags: ['uploads'],
  },
  {
    route: () => routes.demo2(),
    title: 'Demo 2: Store text in filesystem as data',
    description:
      'Transforms input content to uppercase and stores it in the filesystem as data.',
    tags: ['storage', 'filesystem'],
  },
  {
    route: () => routes.demo3(),
    title: 'Demo 3: Store text in filesystem as a file',
    description:
      'Transforms input content to uppercase and stores it in the filesystem as a file.',
    tags: ['storage', 'filesystem'],
  },
  {
    route: () => routes.demo4(),
    title: 'Demo 4: Multiple File Uploads',
    description:
      'Uploads multiple images files and returns their metadata and a url to the image for use in an image tag. No file validation is done. That means you can upload any kind of file, any number of files, and any size file.',
    tags: ['uploads', 'storage', 'multiple', 'filesystem'],
  },
  {
    route: () => routes.demo5(),
    title: 'Demo 5: File Uploads with Storage and Prisma Reference',
    description:
      'Uploads a file and returns the file metadata and a Prisma reference to the file.',
    tags: [
      'uploads',
      'storage',
      'database',
      'filesystem',
      'signedUrl',
      'multiple',
    ],
  },
  {
    route: () => routes.demo6(),
    title:
      'Demo 6: File Uploads with Storage, Prisma Reference, and Upload Token',
    description:
      'Uploads a file and returns the file metadata and a Prisma reference to the file. Now a token is used to validate the file type, size, and number of files. You can upload image or documents. And since the data returned is a dataUri, previews of images or PDF are possible.',
    tags: [
      'uploads',
      'storage',
      'database',
      'validation',
      'filesystem',
      'dataUri',
      'multiple',
      'documents and images',
    ],
  },
  {
    route: () => routes.demo7(),
    title: 'Demo 7: Uploaded Images or Documents to S3',
    description: 'Uploads images or documents to S3.',
    tags: [
      'uploads',
      'storage',
      'database',
      'validation',
      's3',
      'signedUrl',
      'multiple',
      'documents and images',
    ],
  },
  {
    route: () => routes.demo8(),
    title: 'Demo 8: File Uploads with Storage, Prisma Reference, and Variants',
    description:
      'Uploads a file and transforms it to a thumbnail and returns the file metadata and Prisma references to the original, thumbnails (small, medium, large) and tinted/monochrome variants.',
    tags: [
      'uploads',
      'storage',
      'database',
      'filesystem',
      'variants',
      'signedUrl',
    ],
  },
  {
    route: () => routes.demo9(),
    title: 'Demo 9: Profile with Avatar',
    description:
      'Creates a profile with an avatar of different sizes. Shows how a Profile model can have attachments (avatars) with different variants and how to query them.',
    tags: ['uploads', 'storage', 'database', 'filesystem', 'variants'],
  },
  {
    route: () => routes.demo10(),
    title: 'Demo 10: Invoice with PDF',
    description: 'Creates an invoice with an attached PDF.',
    tags: ['storage', 'database', 'filesystem', 'dataUri'],
  },
  {
    route: () => routes.demo11(),
    title: 'Demo 11: Drag and Drop File Upload with Redwood Upload Component',
    description:
      'A simple upload component that allows you to upload a file to the server using a dropzone provided by the Redwood Uploads Component. Reuses Demo 1 api.',
    tags: ['storage', 'database', 'filesystem', 'upload-component'],
  },
  {
    route: () => routes.demo12(),
    title:
      'Demo 12: Drag and Drop File Upload with Redwood Uploads Component and custom options',
    description:
      'A simple upload component that allows you to upload a file to the server using a dropzone provided by a customized Redwood Uploads Component. Reuses Demo 4 api',
    tags: ['storage', 'database', 'filesystem', 'upload-component'],
  },
  {
    route: () => routes.demo13(),
    title: 'Demo 13: Public Urls for OG Images in Social Media',
    description:
      'Create Metadata tag with an image for a Post so that social media can unfurl.',
    tags: ['storage', 'database', 'filesystem', 'publicUrl'],
  },
]
