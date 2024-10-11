import type { MutationResolvers } from 'types/graphql'

import { ValidationError } from '@redwoodjs/graphql-server'

import { logger } from 'src/lib/logger'

//
// Handles file upload, validates input, and returns file metadata
export const demo1: MutationResolvers['demo1'] = async ({ input }) => {
  logger.info({ input }, 'demo1 input')
  const { uploadedFiles } = input

  if (!uploadedFiles || uploadedFiles.length === 0) {
    throw new ValidationError('No files uploaded')
  }

  const firstFile = uploadedFiles[0]
  logger.info({ firstFile }, 'firstFile')

  const { name, type, size } = firstFile

  return {
    id: Math.random().toString(36).substring(2, 10),
    name,
    type,
    size,
  }
}
