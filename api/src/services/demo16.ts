import type { MutationResolvers } from 'types/graphql'

import { ValidationError } from '@redwoodjs/graphql-server'

import { logger } from 'src/lib/logger'

// Handles file upload, validates input, and returns file metadata
export const demo16: MutationResolvers['demo16'] = async ({ input }) => {
  logger.debug({ fileCount: input.uploadedFiles.length }, 'demo16')
  const { uploadedFiles } = input

  if (!uploadedFiles || uploadedFiles.length === 0) {
    throw new ValidationError('No files uploaded')
  }

  const processedFiles = uploadedFiles.map((file) => {
    const { name, type, size } = file
    logger.info({ name, type, size }, 'demo15 file metadata')
    return {
      id: Math.random().toString(36).substring(2, 10),
      name,
      type,
      size,
    }
  })

  return processedFiles
}
