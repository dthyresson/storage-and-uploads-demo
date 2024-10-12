import { MutationResolvers, QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { storage } from 'src/lib/storage'

const storeFile = async <T>(
  file: File,
  callback: (file: File, reference: string) => Promise<T>
): Promise<T> => {
  try {
    const reference = await storage.writeFile(file)
    return await callback(file, reference)
  } catch (error) {
    logger.error({ error, file }, 'Error persisting file')
    throw error
  }
}

const storeFiles = async <T>(
  files: File[],
  callback: (file: File, reference: string) => Promise<T>
): Promise<T[]> => {
  return await Promise.all(files.map((file) => storeFile(file, callback)))
}

export const demo5: MutationResolvers['demo5'] = async ({ input }) => {
  logger.debug({ fileCount: input.images.length }, 'demo5')

  const images = []

  await storeFiles(input.images, async (file, reference) => {
    const createdImage = await db.demo5Image.create({
      data: {
        name: file.name,
        type: file.type,
        size: file.size,
        url: reference,
      },
    })
    images.push(createdImage)
    return images
  })

  return { images }
}

export const demo5Images: QueryResolvers['demo5Images'] = async () => {
  return await db.demo5Image.findMany({ orderBy: { createdAt: 'desc' } })
}
