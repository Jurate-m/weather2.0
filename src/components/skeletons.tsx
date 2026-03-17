function LoadingSpinner() {
  return <span className='block motion-safe:animate-pulse'>Loading...</span>;
}

export function ResultsSkeleton({ message }: { message?: string }) {
  return (
    <div className='border border-t-0 border-stone-300 py-4 px-6 absolute w-full bg-white'>
      {!message && <LoadingSpinner />}
      {message}
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className='h-41 max-w-4xl m-auto px-5 py-4 flex flex-col'>
      {/* Nav imitation */}
      <div className='block h-14 border-b-2 w-full'>
        <ul className='ml-auto flex justify-end -mx-1 py-2'>
          <li className='px-1'>
            <span className='block px-4 py-2'>
              <span className='block h-6 w-11.25 bg-gray-100 motion-safe:animate-pulse'></span>
            </span>
          </li>
          <li className='px-1'>
            <span className='block px-4 py-2'>
              <span className='block h-6 w-11.25 bg-gray-100 motion-safe:animate-pulse'></span>
            </span>
          </li>
          <li className='px-1'>
            <span className='block px-4 py-2'>
              <span className='block h-6 w-11.25 bg-gray-100 motion-safe:animate-pulse'></span>
            </span>
          </li>
        </ul>
      </div>
      {/* Search bar */}
      <div className='py-4 max-w-sm w-full ml-auto relative'>
        <div className='h-10.5 bg-gray-100 motion-safe:animate-pulse'></div>
      </div>
    </div>
  );
}
