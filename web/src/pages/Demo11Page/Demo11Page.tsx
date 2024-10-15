import { useState } from 'react'

import { Form, Submit } from '@redwoodjs/forms'
import { RedwoodUploadsComponent } from '@redwoodjs/uploads-web'
import type { FileRejection } from '@redwoodjs/uploads-web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Demo from 'src/components/Demo/Demo'

const DEMO11_MUTATION = gql`
  mutation Demo11($input: Demo1Input!) {
    demo11: demo1(input: $input) {
      id
      name
      type
      size
    }
  }
`

const Demo11Page = () => {
  const [result, setResult] = useState(null)

  const [demo11, { loading, error }] = useMutation(DEMO11_MUTATION, {
    onCompleted: (data) => {
      console.log('File uploaded:', data.demo11)
      toast.success(`File "${data.demo11.name}" uploaded successfully!`)
      setResult(data.demo11)
    },
    onError: (error) => {
      console.error('Error uploading file:', error)
      toast.error(`Error uploading file: ${error.message}`)
    },
  })

  const [files, setFiles] = useState<File[]>([])
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([])

  // Updated handler for dropping files
  const handleDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    _event: React.DragEvent<HTMLElement>
  ) => {
    setFiles(acceptedFiles)
    setFileRejections(fileRejections)
  }

  const onSubmit = async (data) => {
    try {
      await demo11({
        variables: {
          input: {
            ...data,
            uploadedFiles: files,
          },
        },
      })
      setFiles([])
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Demo index={11} />
      <Form onSubmit={onSubmit} className="mb-8 space-y-4">
        <RedwoodUploadsComponent
          uiElements={{ name: 'uploadedFiles' }}
          fileHandling={{
            onDrop: handleDrop,
            acceptedFiles: files,
            setAcceptedFiles: setFiles,
            fileRejections: fileRejections,
            setFileRejections: setFileRejections,
          }}
          styling={{
            className:
              'flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300',
            activeClassName:
              'flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed border-green-300',
            rejectClassName:
              'flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed border-red-300',
          }}
        />

        <Submit
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload File'}
        </Submit>
      </Form>

      {error && <p className="mb-4 text-red-600">Error: {error.message}</p>}

      {result && (
        <div className="rounded-lg bg-gray-100 p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">File Metadata</h2>
          <ul className="space-y-2">
            <li>
              <strong className="font-medium">Name:</strong> {result.name}
            </li>
            <li>
              <strong className="font-medium">Type:</strong> {result.type}
            </li>
            <li>
              <strong className="font-medium">Size:</strong> {result.size} bytes
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Demo11Page
