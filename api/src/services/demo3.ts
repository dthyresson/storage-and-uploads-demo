import { MutationResolvers } from 'types/graphql'

import { logger } from 'src/lib/logger'
import { storage } from 'src/lib/storage'

export const demo3: MutationResolvers['demo3'] = async ({ input }) => {
  logger.debug({ input }, 'demo3')

  const { content } = input
  const transformedContent = content.toUpperCase()
  const id = Math.random().toString(36).substring(2, 10)
  const file = new File([Buffer.from(transformedContent)], `demo3-${id}.txt`, {
    type: 'text/plain',
  })
  const reference = await storage.writeFile(file)

  return {
    id,
    content,
    transformedContent,
    reference,
    url: reference,
  }
}
