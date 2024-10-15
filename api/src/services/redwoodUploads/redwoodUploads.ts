import {
  createUploadToken,
  IMAGE_CONTENT_TYPES,
  DOCUMENT_CONTENT_TYPES,
} from '@redwoodjs/uploads-graphql'
import type { UploadTokenPayload } from '@redwoodjs/uploads-graphql'

import { logger } from 'src/lib/logger'

import type { GetRedwoodUploadTokenResolver } from './types'
export const getRedwoodUploadToken: GetRedwoodUploadTokenResolver = async ({
  operationName,
}) => {
  if (!process.env.UPLOAD_TOKEN_SECRET) {
    throw new Error('UPLOAD_TOKEN_SECRET is not set')
  }

  logger.debug({ operationName }, 'getRedwoodUploadToken')

  let minFiles = 1
  let maxFiles = 1
  let expiresIn = 1 * 60 * 60 // 1 hour
  let maxFileSize = 1 * 1024 * 1024 // 1MB

  let contentTypes
  // based on the operation name, we can configure the content types, max file size, etc
  switch (operationName) {
    case 'Demo6':
      contentTypes = [...IMAGE_CONTENT_TYPES, ...DOCUMENT_CONTENT_TYPES]
      maxFiles = 2
      break
    case 'Demo7':
      contentTypes = [...IMAGE_CONTENT_TYPES, ...DOCUMENT_CONTENT_TYPES]
      maxFiles = 3
      break
    case 'Demo8':
      contentTypes = IMAGE_CONTENT_TYPES
      maxFiles = 3
      break
    case 'Demo9':
      minFiles = 1
      maxFiles = 1
      expiresIn = 1 * 60 * 60 // 1 hour
      maxFileSize = 10 * 1024 * 1024 // 10MB
      contentTypes = IMAGE_CONTENT_TYPES
      break
    case 'Demo12':
      contentTypes = IMAGE_CONTENT_TYPES
      minFiles = 1
      maxFiles = 2
      break
    default:
      contentTypes = IMAGE_CONTENT_TYPES
  }

  // Note: based on the operation name,we could configure the content types, max file size, etc

  const payload: UploadTokenPayload = {
    operationName,
    minFiles,
    maxFiles,
    expiresIn,
    maxFileSize,
    contentTypes,
  }

  const token = createUploadToken(payload)

  return { token }
}
