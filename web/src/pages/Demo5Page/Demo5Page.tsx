import { Form, FileField, Submit, FieldError } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const DEMO5_MUTATION = gql`
  mutation Demo5($input: Demo5Input!) {
    demo5(input: $input) {
      images {
        id
        name
        type
        size
        url
      }
    }
  }
`

const Demo5Page = () => {
  const [demo5, { loading, error }] = useMutation(DEMO5_MUTATION, {
    onCompleted: (data) => {
      console.log('Files uploaded:', data.demo5.images)
      toast.success(`${data.demo5.images.length} files uploaded successfully!`)
      navigate(routes.demo5Images())
    },
    onError: (error) => {
      console.error('Error uploading files:', error)
      toast.error(`Error uploading files: ${error.message}`)
    },
  })

  const onSubmit = async (data) => {
    console.log('data', data)
    await demo5({ variables: { input: data } })
  }

  return (
    <>
      <Metadata title="Demo 5" description="Demo 5 page" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">
          Demo 5: File Uploads with Storage and Prisma Reference
        </h1>
        <p className="mb-6 text-gray-600">
          Upload multiple files to see the metadata and images stored in the
          database
        </p>

        <div className="mb-8 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <Form onSubmit={onSubmit} className="space-y-4">
            <div>
              <FileField
                name="images"
                multiple={true}
                validation={{ required: true }}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:rounded-full file:border-0
                  file:bg-blue-50 file:px-4
                  file:py-2 file:text-sm
                  file:font-semibold file:text-blue-700
                  hover:file:bg-blue-100"
              />
              <FieldError name="images" className="mt-1 text-sm text-red-600" />
            </div>
            <Submit
              disabled={loading}
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              {loading ? 'Uploading...' : 'Upload Files'}
            </Submit>
          </Form>
        </div>

        {error && <p className="mb-4 text-red-600">Error: {error.message}</p>}

        <Link
          to={routes.demo5Images()}
          className="font-semibold text-blue-500 hover:text-blue-700"
        >
          View Images
        </Link>
      </div>
    </>
  )
}

export default Demo5Page
