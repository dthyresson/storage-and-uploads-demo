export const schema = gql`
  type Invoice {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    invoiceId: String!
    customer: String!
    amount: Int!
    dueOn: DateTime!
    invoicedOn: DateTime!
    memo: String!
    pdf: String! @withStorage(format: DATA_URI)
  }

  type Query {
    invoices: [Invoice!]! @skipAuth
  }

  type Mutation {
    createInvoice: Invoice! @skipAuth
  }
`
