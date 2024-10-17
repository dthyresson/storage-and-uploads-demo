export type ProgressBarProps = {
  progress: number
  inProgress: boolean
  onAbort: () => void
}

const ProgressBar = ({ progress, inProgress, onAbort }: ProgressBarProps) => {
  return (
    <>
      {inProgress && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Uploading...</h3>
          <div className="flex items-center">
            <div className="mr-2 h-2.5 w-full rounded-full bg-gray-200">
              <div
                className="h-2.5 rounded-full bg-blue-600 transition-all duration-300 ease-in-out"
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
            {/* Add percentage display */}
            <span className="ml-2 text-sm font-medium text-gray-700">
              {Math.round(progress * 100)}%
            </span>
          </div>
          <div className="my-6 flex justify-end">
            <button
              onClick={onAbort}
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ProgressBar
