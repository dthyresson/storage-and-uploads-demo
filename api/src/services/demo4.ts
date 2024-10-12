import { MutationResolvers } from 'types/graphql'

import { logger } from 'src/lib/logger'
import { storage } from 'src/lib/storage'

export const demo4: MutationResolvers['demo4'] = async ({ input }) => {
  logger.debug({ fileCount: input.attachments.length }, 'demo4')

  const attachments = []

  for (const attachment of input.attachments) {
    const processedAttachment = {
      id: Math.random().toString(36).substring(2, 10),
      name: attachment.name,
      type: attachment.type,
      size: attachment.size,
      reference: await storage.writeFile(attachment),
      variant: 'original',
    }
    attachments.push(processedAttachment)
  }

  return { attachments }
}
