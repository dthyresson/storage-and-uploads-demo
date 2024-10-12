import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Demo from 'src/components/Demo'

const CREATE_INVOICE_MUTATION = gql`
  mutation CreateInvoiceMutation {
    createInvoice {
      id
      createdAt
      updatedAt
      amount
      customer
      invoiceId
      invoicedOn
      memo
      pdf
    }
  }
`

const INVOICES_QUERY = gql`
  query InvoicesQuery {
    invoices {
      id
      createdAt
      updatedAt
      amount
      customer
      invoiceId
      invoicedOn
      memo
      pdf
    }
  }
`

const Demo10Page = () => {
  const { data, loading: invoicesLoading, refetch } = useQuery(INVOICES_QUERY)

  const [createInvoice, { loading }] = useMutation(CREATE_INVOICE_MUTATION, {
    onCompleted: () => {
      toast.success('Invoice created successfully')
      refetch()
    },
    onError: (error) => {
      toast.error(`Error creating invoice: ${error.message}`)
    },
  })

  const handleCreateInvoice = () => {
    createInvoice()
  }

  return (
    <>
      <Demo index={10} />
      <button
        onClick={handleCreateInvoice}
        disabled={loading}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Invoice'}
      </button>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!invoicesLoading &&
          data?.invoices?.map((invoice) => (
            <div key={invoice.id} className="rounded-lg border p-4 shadow">
              <h3 className="mb-2 text-lg font-semibold">
                Invoice #{invoice.invoiceId}
              </h3>
              <p>
                <strong>Customer:</strong> {invoice.customer}
              </p>
              <p>
                <strong>Amount:</strong> ${invoice.amount.toFixed(2)}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(invoice.invoicedOn).toLocaleDateString()}
              </p>
              <p>
                <strong>Memo:</strong> {invoice.memo}
              </p>
              {invoice.pdf && (
                <div className="mt-4 text-center">
                  <a
                    href={invoice.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded bg-green-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    View PDF
                  </a>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  )
}

export default Demo10Page
