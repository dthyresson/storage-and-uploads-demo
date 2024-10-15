import { createGraphQLHandler } from '@redwoodjs/graphql-server'
import { useRedwoodUploads } from '@redwoodjs/uploads-graphql'

//
// In extraPlugins setup useRedwoodUpload
// extraPlugins: [
//   useRedwoodUpload({
//     appName: 'Redwood Storage and Uploads Demo',
//   }),
// ]
//

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  extraPlugins: [
    useRedwoodUploads({
      appName: 'Redwood Storage and Uploads Demo',
      errorMessages: {
        tooManyFiles: ({ maxFiles }) =>
          `Way too many files!!!! Only ${maxFiles} files allowed`,
        tooLargeFile: ({ maxFileSize }) =>
          `File too large, max size is ${maxFileSize} bytes`,
        invalidFileType: 'Invalid file type',
        tooFewFiles: 'Too few files',
      },
    }),
  ],
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
