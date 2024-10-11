import { Demo4Image, MutationResolvers } from 'types/graphql'

import { logger } from 'src/lib/logger'
import { storage } from 'src/lib/storage'

export const demo4: MutationResolvers['demo4'] = async ({ input }) => {
  logger.debug({ fileCount: input.images.length }, 'demo4')

  const images = [] as Demo4Image[]

  for (const image of input.images) {
    const processedImage = {
      id: Math.random().toString(36).substring(2, 10),
      name: image.name,
      type: image.type,
      size: image.size,
      url: await storage.writeFile(image),
    }
    images.push(processedImage)
  }

  return { images }
}
