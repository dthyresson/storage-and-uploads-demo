# RedwoodJS Storage and Uploads Demo

This is a demo of how to use RedwoodJS to upload files and store them in the filesystem, S3, or a CDN. It also shows how to create thumbnails, variants, and how to query them.

## Demos

See the [Demos](./web/src/demos.ts) file and the Home Page for more information about each demo.

## Setup

These demos use filesystem and S3 storage.

To use the S3 storage, you'll need to set up an account with AWS or Tigris and add the appropriate credentials to the `.env` file.

See the example `.env.example` file for the required variables.

### Quick Start

Start by installing dependencies:

```
yarn install
```

Create the Prisma database schema and apply the migrations:

```
yarn rw prisma migrate dev
```

Then start the development server:

```
yarn rw dev
```

Your browser should automatically open to [http://localhost:8910](http://localhost:8910) where you'll see the Welcome Page, which links out to many great resources.


## Quick Links

- Stay updated: read [Forum announcements](https://community.redwoodjs.com/c/announcements/5), follow us on [Twitter](https://twitter.com/redwoodjs), and subscribe to the [newsletter](https://redwoodjs.com/newsletter)
- [Learn how to contribute](https://redwoodjs.com/docs/contributing)
