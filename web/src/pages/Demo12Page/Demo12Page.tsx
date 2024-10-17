import { useState, useCallback } from 'react'

import { Form, Submit } from '@redwoodjs/forms'
import {
  RedwoodUploadsComponent,
  ACCEPTED_IMAGE_TYPES,
  RedwoodFilePickerButton,
} from '@redwoodjs/uploads-web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Demo from 'src/components/Demo/Demo'

import { CustomMessage } from './CustomMessage'
import { CustomPreviewFileRejections } from './CustomPreviewFileRejections'
import { CustomPreviewFiles } from './CustomPreviewFiles'
import { FileUploadResult } from './FileUploadResult'
const DEMO4_MUTATION = gql`
  mutation Demo12($input: Demo4Input!) {
    demo12: demo4(input: $input) {
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

const Demo12Page = () => {
  const [resetFiles, setResetFiles] = useState<(() => void) | null>(null)

  const onResetFiles = useCallback((resetFunction: () => void) => {
    setResetFiles(() => resetFunction)
  }, [])

  const [result, setResult] = useState(null)
  const [files, setFiles] = useState([])

  const [demo12, { loading, error }] = useMutation(DEMO4_MUTATION, {
    onCompleted: (data) => {
      if (resetFiles) {
        resetFiles()
      }

      toast.success(
        `${data.demo12.attachments.length} files uploaded successfully!`
      )
      setResult(data.demo12)
    },
    onError: (error) => {
      setResult([])
      console.error('Error uploading files:', error)
      toast.error(`Error uploading files: ${error.message}`)
    },
  })

  const onSubmit = async (data) => {
    if (files.length === 0) {
      toast.error('No files selected')
      return
    }

    try {
      await demo12({
        variables: {
          input: {
            ...data,
            attachments: files,
          },
        },
      })
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Demo index={12} />

        {error && <p className="mb-4 text-red-600">Error: {error.message}</p>}

        <Form onSubmit={onSubmit} className="mb-8 space-y-4">
          <RedwoodUploadsComponent
            name="attachments"
            className="h-40 w-full items-center justify-center rounded-md border-2 border-dotted border-gray-300 bg-gray-50"
            fileConstraints={{
              maxSize: 1.2 * 1024 * 1024, // 1.2MB
              maxFiles: 4,
              accept: ACCEPTED_IMAGE_TYPES,
            }}
            setFiles={setFiles}
            onResetFiles={onResetFiles}
            allowPaste={true}
            dropzoneContent={
              <div className="flex h-40 items-center justify-center text-neutral-500">
                <RedwoodFilePickerButton className="my-8 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
                  Pick File
                </RedwoodFilePickerButton>
              </div>
            }
            messageContent={<CustomMessage />}
            noClick={true}
            disabled={loading}
          >
            <CustomPreviewFiles />
            <CustomPreviewFileRejections />
          </RedwoodUploadsComponent>

          <Submit
            disabled={loading}
            className="rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-600
            disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </Submit>
        </Form>

        <FileUploadResult result={result} />
      </div>
    </>
  )
}

export default Demo12Page
