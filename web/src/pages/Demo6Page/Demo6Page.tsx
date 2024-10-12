import { Form, FileField, Submit, FieldError } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { useUploadsMutation } from '@redwoodjs/uploads-web'
import { toast } from '@redwoodjs/web/toast'

import Demo from 'src/components/Demo/Demo'

const DEMO6_MUTATION = gql`
  mutation Demo6($input: Demo6Input!) {
    demo6(input: $input) {
      attachments {
        id
        name
        type
        size
        reference
      }
    }
  }
`

const Demo6Page = () => {
  const [demo6, { loading, error }] = useUploadsMutation(DEMO6_MUTATION, {
    onCompleted: (data) => {
      console.log('Files uploaded:', data.demo6.attachments)
      toast.success(
        `${data.demo6.attachments.length} files uploaded successfully!`
      )
      navigate(routes.demo6Attachments())
    },
    onError: (error) => {
      console.error('Error uploading files:', error)
      toast.error(`Error uploading files: ${error.message}`)
    },
  })

  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      await demo6({ variables: { input: data } })
    } catch (error) {
      // This catch block is now optional, as errors are handled in onError
      console.error('Unexpected error:', error)
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Demo index={6} />

        <Form onSubmit={onSubmit} className="space-y-4">
          <div>
            <FileField
              name="attachments"
              multiple={true}
              validation={{ required: true }}
              className="block w-full text-sm text-gray-500
                  file:mr-4 file:rounded-full file:border-0
                  file:bg-blue-50 file:px-4
                  file:py-2 file:text-sm
                  file:font-semibold file:text-blue-700
                  hover:file:bg-blue-100"
            />
            <FieldError
              name="attachments"
              className="mt-1 text-sm text-red-600"
            />
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
        to={routes.demo6Attachments()}
        className="font-semibold text-blue-500 hover:text-blue-700"
      >
        View Uploaded Images or Documents
      </Link>
    </>
  )
}

export default Demo6Page
