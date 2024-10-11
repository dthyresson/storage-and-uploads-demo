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
          <Link to={routes.demo1()}>Demo 1: File Upload and Validation</Link>
          <p>
            Handles file uploads, validates input, and returns file metadata.
          </p>
        </li>
        <li>
          <Link to={routes.demo2()}>
            Demo 2: Content Transformation and Storage
          </Link>
          <p>
            Transforms input content to uppercase and stores it using a storage
            service as data.
          </p>
        </li>
        <li>
          <Link to={routes.demo3()}>Demo 3</Link>
          <p>
            Transforms input content to uppercase and stores it using a storage
            service as a file.
          </p>
        </li>
      </ul>
    </>
  )
}

export default HomePage
