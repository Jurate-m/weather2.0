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
      <div className='block h-14 border-b border-gray-200 w-full'>
        <ul className='ml-auto flex justify-end -mx-1 py-2'>
          <li className='px-1'>
            <span className='block px-4 py-2'>
              <span className='block h-6 w-11.25 bg-gray-200 motion-safe:animate-pulse'></span>
            </span>
          </li>
          <li className='px-1'>
            <span className='block px-4 py-2'>
              <span className='block h-6 w-11.25 bg-gray-200 motion-safe:animate-pulse'></span>
            </span>
          </li>
          <li className='px-1'>
            <span className='block px-4 py-2'>
              <span className='block h-6 w-11.25 bg-gray-200 motion-safe:animate-pulse'></span>
            </span>
          </li>
        </ul>
      </div>
      {/* Search bar */}
      <div className='py-4 max-w-sm w-full ml-auto relative'>
        <div className='h-10.5 bg-gray-200 motion-safe:animate-pulse'></div>
      </div>
    </div>
  );
}

export function WrapperSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <span className='block rounded-full h-10 w-60 font-bold mb-6 bg-gray-200 motion-safe:animate-pulse'></span>
      {children}
    </section>
  );
}

export function HomeForecastSkeleton() {
  return (
    <>
      <div className='pb-6'>
        <div className='grid grid-cols-2 gap-4 pb-8'>
          <div className='flex flex-col max-w-full'>
            <span className='block rounded-full h-7 w-50 max-w-full mb-2 bg-gray-200 motion-safe:animate-pulse'></span>
            <span className='block rounded-full mb-17 h-6 max-w-full w-40 bg-gray-200 motion-safe:animate-pulse'></span>
            <span className='block rounded-full h-10 w-20 max-w-full mt-auto bg-gray-200 motion-safe:animate-pulse'></span>
          </div>
          <span className='block mx-auto rounded-xl w-full h-42.5 bg-gray-200 motion-safe:animate-pulse'></span>
        </div>
        <ul className='xs:grid grid-cols-2 gap-x-6'>
          {Array.from({ length: 4 }).map((_, index) => (
            <li
              key={index}
              className='grid gap-2 grid-cols-[repeat(auto-fit,minmax(100px,1fr))] border-b border-gray-200 last:border-b-0 xs:nth-last-[-n+2]:border-0 py-4'
            >
              <span className='block rounded-full w-20 h-5 bg-gray-200 motion-safe:animate-pulse'></span>
              <span className='block rounded-full w-15 h-5 ml-auto bg-gray-200 motion-safe:animate-pulse'></span>
            </li>
          ))}
        </ul>
      </div>
      <ul className='grid grid-cols-3 xs:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] py-4 divide-x-4 divide-gray-950/2'>
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index}>
            <div className='w-full p-4 grid grid-flow-row gap-2'>
              <span className='block rounded-full mx-auto w-11.25 h-6 bg-gray-200 motion-safe:animate-pulse'></span>
              <span className='block rounded-xl mx-auto h-10 w-16 bg-gray-200 motion-safe:animate-pulse'></span>
              <span className='block rounded-full mx-auto w-7.5 h-5 bg-gray-200 motion-safe:animate-pulse'></span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export function DynamicSkeleton() {
  return (
    <WrapperSkeleton>
      <div className='grid gap-6'>
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <span
              key={index}
              className='block rounded-xl h-18 w-full bg-gray-200 motion-safe:animate-pulse'
            ></span>
          );
        })}
      </div>
    </WrapperSkeleton>
  );
}
