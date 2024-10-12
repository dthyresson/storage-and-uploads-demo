import {
  Form,
  TextField,
  Label,
  FieldError,
  FileField,
  Submit,
} from '@redwoodjs/forms'
import { useUploadsMutation } from '@redwoodjs/uploads-web'
import { useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Demo from 'src/components/Demo/Demo'

const CREATE_PROFILE_MUTATION = gql`
  mutation CreateProfileMutation($input: CreateProfileInput!) {
    createProfile(input: $input) {
      id
      firstName
      lastName
      avatars {
        id
        type
        name
        size
        reference
        variant
      }
    }
  }
`

const PROFILE_QUERY = gql`
  query ProfileQuery {
    profiles {
      id
      firstName
      lastName
      avatars {
        id
        type
        name
        size
        reference
        variant
      }
    }
  }
`

const Demo9Page = () => {
  const { data: profiles, refetch } = useQuery(PROFILE_QUERY)

  const [createProfile, { loading, error }] = useUploadsMutation(
    CREATE_PROFILE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Profile created successfully')
        refetch()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = async (data) => {
    try {
      console.log(data, 'data')
      await createProfile({ variables: { input: data } })
    } catch (error) {
      console.error('Error creating profile:', error)
    }
  }

  return (
    <div>
      <Demo index={9} />
      <div className="mx-auto mt-8 max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Create Profile</h1>
        <Form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label name="firstName" errorClassName="text-red-600">
              First Name
            </Label>
            <TextField
              name="firstName"
              validation={{ required: true }}
              errorClassName="border-red-600"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <FieldError
              name="firstName"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <Label name="lastName" errorClassName="text-red-600">
              Last Name
            </Label>
            <TextField
              name="lastName"
              validation={{ required: true }}
              errorClassName="border-red-600"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <FieldError name="lastName" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <Label name="avatar" errorClassName="text-red-600">
              Avatar
            </Label>
            <FileField
              name="avatar"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:rounded-md file:border-0
              file:bg-indigo-50 file:px-4
              file:py-2 file:text-sm
              file:font-semibold file:text-indigo-700
              hover:file:bg-indigo-100"
            />
            <FieldError name="avatar" className="mt-1 text-sm text-red-600" />
          </div>

          <Submit
            disabled={loading}
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Profile'}
          </Submit>
        </Form>

        {error && (
          <div className="mt-4 text-sm text-red-600">{error.message}</div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Profiles</h2>
        <div className="space-y-4">
          {profiles?.profiles.map((profile) => (
            <div key={profile.id} className="rounded-lg border p-4 shadow">
              <div className="flex items-center">
                <div className="w-1/4 font-semibold">{profile.firstName}</div>
                <div className="w-1/4 font-semibold">{profile.lastName}</div>
                <div className="w-1/2">
                  <h3 className="text-md mb-2 font-medium">Avatars:</h3>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {profile.avatars.map((avatar) => (
                      <div key={avatar.id} className="rounded border p-2">
                        <img
                          src={avatar.reference}
                          alt={avatar.variant}
                          className="mx-auto mb-2"
                        />
                        <div className="text-xs">
                          <p>
                            <span className="font-semibold">Type:</span>{' '}
                            {avatar.type}
                          </p>
                          <p>
                            <span className="font-semibold">Name:</span>{' '}
                            {avatar.name}
                          </p>
                          <p>
                            <span className="font-semibold">Size:</span>{' '}
                            {avatar.size}
                          </p>

                          <p>
                            <span className="font-semibold">Variant:</span>{' '}
                            {avatar.variant}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Demo9Page
