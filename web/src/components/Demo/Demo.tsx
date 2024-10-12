import { Metadata } from '@redwoodjs/web'

import { TagList } from 'src/components/TagList/TagList'
import { demos } from 'src/demos'

const Demo = ({ index = 1 }: { index?: number }) => {
  const demo = demos[index - 1]
  const { title, description } = demo

  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow">
      <Metadata title={title} description={description} />
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <p className="mb-6 text-gray-600">{description}</p>
      <div className="mt-4">
        <TagList tags={demo.tags} />
      </div>
    </div>
  )
}

export default Demo
