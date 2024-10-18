export const getTagColor = (tag: string) => {
  switch (tag) {
    case 'uploads':
      return 'bg-blue-200 text-blue-800'
    case 'storage':
      return 'bg-green-200 text-green-800'
    case 'database':
      return 'bg-purple-200 text-purple-800'
    case 'validation':
      return 'bg-yellow-200 text-yellow-800'
    case 'signedUrl':
      return 'bg-orange-200 text-orange-800'
    case 'dataUri':
      return 'bg-teal-200 text-teal-800'
    case 'multiple':
      return 'bg-pink-200 text-pink-800'
    case 's3':
      return 'bg-red-200 text-red-800'
    case 'filesystem':
      return 'bg-cyan-200 text-cyan-800'
    case 'documents and images':
      return 'bg-indigo-200 text-indigo-800'
    case 'upload-component':
      return 'bg-fuchsia-300 text-fuchsia-900'
    case 'variants':
      return 'bg-emerald-300 text-emerald-900'
    case 'publicUrl':
      return 'bg-orange-200 text-orange-800'
    case 'upload-token':
      return 'bg-green-200 text-green-800'
    case 'progress':
      return 'bg-yellow-200 text-yellow-800'
    case 'auth':
      return 'bg-sky-200 text-sky-800'
    default:
      return 'bg-gray-200 text-gray-800'
  }
}

export const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`rounded-md px-2 py-1 text-sm ${getTagColor(tag)}`}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
