import Demo from 'src/components/Demo'
import PostCell from 'src/components/PostCell'

const Demo13PostPage = ({ id }: { id: string }) => {
  return (
    <>
      <Demo index={13} />
      <PostCell id={id} />
    </>
  )
}

export default Demo13PostPage
