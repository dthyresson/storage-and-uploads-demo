import {
  createUploadToken,
  IMAGE_CONTENT_TYPES,
} from '@redwoodjs/uploads-graphql'
import type { UploadTokenPayload } from '@redwoodjs/uploads-graphql'

import type { GetRedwoodUploadTokenResolver } from './types'
export const getRedwoodUploadToken: GetRedwoodUploadTokenResolver = async ({
  operationName,
}) => {
  if (!process.env.UPLOAD_TOKEN_SECRET) {
    throw new Error('UPLOAD_TOKEN_SECRET is not set')
  }

  // Note: based on the operation name, we could configure the content types, max file size, etc

  const payload: UploadTokenPayload = {
    operationName,
    minFiles: 1,
    maxFiles: 3,
    expiresIn: 1 * 60 * 60, // 1 hour
    maxFileSize: 1 * 1024 * 1024, // 1MB
    contentTypes: IMAGE_CONTENT_TYPES,
  }

  const token = createUploadToken(payload)

  return { token }
}
