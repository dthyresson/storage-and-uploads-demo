import { MutationResolvers } from 'types/graphql'

import { logger } from 'src/lib/logger'
import { storage } from 'src/lib/storage'

export const demo2: MutationResolvers['demo2'] = async ({ input }) => {
  logger.debug({ input }, 'demo2')
  const { content } = input
  const transformedContent = content.toUpperCase()
  const data = Buffer.from(transformedContent)
  const reference = await storage.writeData(data)

  return {
    content,
    transformedContent,
    reference,
    url: reference,
  }
}
