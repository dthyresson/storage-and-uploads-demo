import { Metadata } from '@redwoodjs/web'

import { demos } from 'src/demos'

const Demo = ({ index = 1 }: { index?: number }) => {
  const demo = demos[index - 1]
  const { title, description } = demo

  return (
    <>
      <Metadata title={title} description={description} />
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <p className="mb-6 text-gray-600">{description}</p>
    </>
  )
}

export default Demo
