import { MutationResolvers, QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { storage } from 'src/lib/storage'

const storeFile = async <T>(
  file: File,
  callback: (file: File, reference: string) => Promise<T>
): Promise<T> => {
  try {
    const reference = await storage.findAdapter('s3').writeFile(file)
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

export const demo7: MutationResolvers['demo7'] = async ({ input }) => {
  logger.debug({ fileCount: input.attachments.length }, 'demo7')

  const attachments = await storeFiles(
    input.attachments,
    async (file, reference) => {
      const createdAttachment = await db.attachment.create({
        data: {
          demo: 'demo7',
          name: file.name,
          type: file.type,
          size: file.size,
          reference,
          variant: 'original',
        },
      })
      return createdAttachment
    }
  )

  return { attachments }
}

export const demo7Attachments: QueryResolvers['demo7Attachments'] =
  async () => {
    return await db.attachment.findMany({
      where: { demo: 'demo7', variant: 'original' },
      orderBy: { createdAt: 'desc' },
    })
  }
