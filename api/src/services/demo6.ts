import { Demo6Image, MutationResolvers, QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { storage } from 'src/lib/storage'

export const demo6: MutationResolvers['demo5'] = async ({ input }) => {
  logger.debug({ fileCount: input.images.length }, 'demo5')

  const images = []

  for (const image of input.images) {
    const processedImage = {
      name: image.name,
      type: image.type,
      size: image.size,
      url: await storage.writeFile(image),
    } as Demo6Image

    const createdImage = await db.demo5Image.create({ data: processedImage })
    images.push(createdImage)
  }

  return { images }
}

export const demo6Images: QueryResolvers['demo6Images'] = async () => {
  return await db.demo6Image.findMany({ orderBy: { createdAt: 'desc' } })
}
