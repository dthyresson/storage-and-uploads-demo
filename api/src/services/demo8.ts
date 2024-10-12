import sharp from 'sharp'
import { MutationResolvers, QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { storage } from 'src/lib/storage'

type AttachmentVariant =
  | 'original'
  | 'thumbnail'
  | 'medium'
  | 'large'
  | 'monochrome'
  | 'tinted'

// New functions for thumbnail and tinted versions
export const createThumbnail = async (
  file: File,
  variant: AttachmentVariant
): Promise<File> => {
  try {
    const factor =
      variant === 'thumbnail'
        ? 1
        : variant === 'medium'
          ? 2
          : variant === 'large'
            ? 4
            : 1
    const size = 24 * factor
    const buffer = await file.arrayBuffer()
    const resizedBuffer = await sharp(buffer)
      .resize(size, size, { fit: 'cover' })
      .toBuffer()

    return new File([resizedBuffer], `${variant}_${file.name}`, {
      type: file.type,
    })
  } catch (error) {
    logger.error({ error, file }, 'Error creating thumbnail')
    throw error
  }
}

const createTintedVersion = async (file: File): Promise<File> => {
  try {
    const buffer = await file.arrayBuffer()
    const tintedBuffer = await sharp(buffer)
      .tint({ r: 255, g: 200, b: 200 }) // Light red tint
      .toBuffer()

    return new File([tintedBuffer], `tinted_${file.name}`, { type: file.type })
  } catch (error) {
    logger.error({ error, file }, 'Error creating tinted version')
    throw error
  }
}

const createMonochromeVersion = async (file: File): Promise<File> => {
  try {
    const buffer = await file.arrayBuffer()
    const monochromeBuffer = await sharp(buffer).greyscale().toBuffer()

    return new File([monochromeBuffer], `monochrome_${file.name}`, {
      type: file.type,
    })
  } catch (error) {
    logger.error({ error, file }, 'Error creating tinted version')
    throw error
  }
}

const storeFile = async <T>(
  file: File,
  variant: AttachmentVariant,
  callback: (
    file: File,
    reference: string,
    variant: AttachmentVariant
  ) => Promise<T>
): Promise<T> => {
  try {
    let fileVariant: File

    switch (variant) {
      case 'thumbnail':
        fileVariant = await createThumbnail(file, variant)
        break
      case 'medium':
        fileVariant = await createThumbnail(file, variant)
        break
      case 'large':
        fileVariant = await createThumbnail(file, variant)
        break
      case 'tinted':
        fileVariant = await createTintedVersion(file)
        break
      case 'monochrome':
        fileVariant = await createMonochromeVersion(file)
        break
      case 'original':
      default:
        fileVariant = file
    }

    logger.debug({ variant }, `fileVariant and variant: ${variant}`)

    const reference = await storage.writeFile(fileVariant)
    return await callback(file, reference, variant)
  } catch (error) {
    logger.error({ error, file }, 'Error persisting file')
    throw error
  }
}

const storeFiles = async <T>(
  files: File[],
  variant: AttachmentVariant,
  callback: (
    file: File,
    reference: string,
    variant: AttachmentVariant
  ) => Promise<T>
): Promise<T[]> => {
  return await Promise.all(
    files.map((file) => storeFile(file, variant, callback))
  )
}

export const demo8: MutationResolvers['demo8'] = async ({ input }) => {
  logger.debug({ fileCount: input.attachments.length }, 'demo8')

  const originalAttachments = await storeFiles(
    input.attachments,
    'original',
    async (file, reference, variant) => {
      const createdAttachment = await db.attachment.create({
        data: {
          demo: 'demo8',
          name: file.name,
          type: file.type,
          size: file.size,
          reference,
          variant,
        },
      })
      return createdAttachment
    }
  )

  const thumbnailAttachments = await storeFiles(
    input.attachments,
    'thumbnail',
    async (file, reference, variant) => {
      const createdAttachment = await db.attachment.create({
        data: {
          demo: 'demo8',
          name: file.name,
          type: file.type,
          size: file.size,
          reference,
          variant,
        },
      })
      return createdAttachment
    }
  )

  const mediumAttachments = await storeFiles(
    input.attachments,
    'medium',
    async (file, reference, variant) => {
      const createdAttachment = await db.attachment.create({
        data: {
          demo: 'demo8',
          name: file.name,
          type: file.type,
          size: file.size,
          reference,
          variant,
        },
      })
      return createdAttachment
    }
  )

  const largeAttachments = await storeFiles(
    input.attachments,
    'large',
    async (file, reference, variant) => {
      const createdAttachment = await db.attachment.create({
        data: {
          demo: 'demo8',
          name: file.name,
          type: file.type,
          size: file.size,
          reference,
          variant,
        },
      })
      return createdAttachment
    }
  )

  const tintedAttachments = await storeFiles(
    input.attachments,
    'tinted',
    async (file, reference, variant) => {
      const createdAttachment = await db.attachment.create({
        data: {
          demo: 'demo8',
          name: file.name,
          type: file.type,
          size: file.size,
          reference,
          variant,
        },
      })
      return createdAttachment
    }
  )

  const monochromeAttachments = await storeFiles(
    input.attachments,
    'monochrome',
    async (file, reference, variant) => {
      const createdAttachment = await db.attachment.create({
        data: {
          demo: 'demo8',
          name: file.name,
          type: file.type,
          size: file.size,
          reference,
          variant,
        },
      })
      return createdAttachment
    }
  )
  return {
    attachments: [
      ...originalAttachments,
      ...thumbnailAttachments,
      ...mediumAttachments,
      ...largeAttachments,
      ...tintedAttachments,
      ...monochromeAttachments,
    ],
  }
}

export const demo8Attachments: QueryResolvers['demo8Attachments'] =
  async () => {
    return await db.attachment.findMany({
      where: {
        demo: 'demo8',
      },
      orderBy: { createdAt: 'desc' },
    })
  }
