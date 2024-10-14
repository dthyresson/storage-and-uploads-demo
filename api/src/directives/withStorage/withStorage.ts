import { RedwoodStorageFormat } from 'types/graphql'

import {
  createTransformerDirective,
  TransformerDirectiveFunc,
} from '@redwoodjs/graphql-server'
import type { StorageAdapter } from '@redwoodjs/storage-core'

import { logger } from 'src/lib/logger'
import { storage } from 'src/lib/storage'
export const schema = gql`
  """
  Use @withStorage to fetch data from storage as a signed URL or data URI.
  """
  enum RedwoodStorageFormat {
    SIGNED_URL
    DATA_URI
  }
  enum RedwoodStorageAdapter {
    S3
    FS
  }

  directive @withStorage(
    format: RedwoodStorageFormat = SIGNED_URL
    adapter: RedwoodStorageAdapter = FS
  ) on FIELD_DEFINITION
`

export const getBase64DataUri = async (
  adapter: StorageAdapter,
  reference: string
): Promise<string> => {
  try {
    const file = await adapter.readFile(reference)
    const base64Data = Buffer.from(await file.arrayBuffer()).toString('base64')
    const mimeType = file.type

    const dataUri = `data:${mimeType};base64,${base64Data}`
    return dataUri
  } catch (error) {
    logger.error({ error, reference }, 'Error creating base64 data URI')
    throw error
  }
}

const transform: TransformerDirectiveFunc = async ({
  directiveArgs,
  resolvedValue,
}) => {
  if (
    !resolvedValue ||
    typeof resolvedValue !== 'string' ||
    resolvedValue.length === 0
  ) {
    return null
  }

  const format = directiveArgs.format as RedwoodStorageFormat
  const adapter = storage.findAdapter(
    directiveArgs.adapter.toLowerCase() as string
  )

  // you can check context's currentUser to conditionally return signed urls or data uris

  try {
    if (format === 'SIGNED_URL') {
      // rename to temporaryUrl?
      return await adapter.getSignedUrl(resolvedValue)
    }

    // format of public

    if (format === 'DATA_URI') {
      return await getBase64DataUri(adapter, resolvedValue)
    }

    return resolvedValue
  } catch (error) {
    logger.error({ error, resolvedValue }, 'Error in withStorage directive')
    throw new Error('Failed to process storage directive')
  }
}

const withStorage = createTransformerDirective(schema, transform)

export default withStorage
