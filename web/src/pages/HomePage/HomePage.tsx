import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata
        title="Storage and File Uploads Demos"
        description="Demos for using Storage and File Uploads"
      />

      <h1>Storage and File Uploads Demos</h1>
      <ul>
        <li>
          <Link to={routes.demo1()}>Demo 1</Link>
        </li>
      </ul>
    </>
  )
}

export default HomePage
