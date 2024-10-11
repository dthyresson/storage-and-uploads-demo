import {
  createTransformerDirective,
  TransformerDirectiveFunc,
} from '@redwoodjs/graphql-server'

import { storage } from 'src/lib/storage'
export const schema = gql`
  """
  Use @withStorage to write data to storage.
  """
  directive @withStorage on FIELD_DEFINITION
`

const transform: TransformerDirectiveFunc = async ({ resolvedValue }) => {
  if (
    !resolvedValue ||
    typeof resolvedValue !== 'string' ||
    resolvedValue.length === 0
  ) {
    return null
  }
  const signedUrl = await storage.getSignedUrl(resolvedValue)
  return signedUrl
}

const withStorage = createTransformerDirective(schema, transform)

export default withStorage
