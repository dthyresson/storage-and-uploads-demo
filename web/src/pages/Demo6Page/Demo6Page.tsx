import { Form, FileField, Submit, FieldError } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { useUploadsMutation } from '@redwoodjs/uploads-web'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const DEMO6_MUTATION = gql`
  mutation Demo6($input: Demo6Input!) {
    demo6(input: $input) {
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

const Demo6Page = () => {
  const [demo6, { loading, error }] = useUploadsMutation(DEMO6_MUTATION)

  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      const result = await demo6({ variables: { input: data } })
      console.log('Files uploaded:', result.data.demo6.images)
      toast.success(
        `${result.data.demo5.images.length} files uploaded successfully!`
      )
      navigate(routes.demo6Images())
    } catch (error) {
      console.error('Error uploading files:', error)
      toast.error(`Error uploading files: ${error.message}`)
    }
  }

  return (
    <>
      <Metadata title="Demo 5" description="Demo 5 page" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">
          Demo 6: File Uploads with Storage, Prisma Reference, and Upload Token
          Validation
        </h1>
        <p className="mb-6 text-gray-600">
          Upload multiple files to see the metadata and images stored in the
          database. Max 3 files, 1MB each.
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
          to={routes.demo6Images()}
          className="font-semibold text-blue-500 hover:text-blue-700"
        >
          View Images
        </Link>
      </div>
    </>
  )
}

export default Demo6Page
