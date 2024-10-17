// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const Demo15Page = () => {
  return (
    <>
      <Metadata title="Demo15" description="Demo15 page" />

      <h1>Demo15Page</h1>
      <p>
        Find me in <code>./web/src/pages/Demo15Page/Demo15Page.tsx</code>
      </p>
      {/*
          My default route is named `demo15`, link to me with:
          `<Link to={routes.demo15()}>Demo15</Link>`
      */}
    </>
  )
}

export default Demo15Page
