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
      <div className='py-4 max-w-sm w-full ml-auto relative'>
        <div className='h-10.5 bg-gray-200 motion-safe:animate-pulse'></div>
      </div>
    </div>
  );
}

export function WrapperSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <section className='grid md:grid-cols-[minmax(max-content,_1fr)_minmax(332px,_2fr)] relative'>
      <span className='block rounded-xl h-10 w-40 font-bold mb-6 bg-gray-200 motion-safe:animate-pulse mx-auto'></span>
      {children}
    </section>
  );
}

export function HomeForecastSkeleton() {
  return (
    <>
      <div>
        <span className='block pb-6'>
          <span className='block h-[400px] w-[660px] max-w-full rounded-xl bg-gray-200 motion-safe:animate-pulse'></span>
        </span>
        <span className='grid grid-cols-3 xs:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] py-4 gap-x-1'>
          <span className='block w-full h-[110px] rounded-xl bg-gray-200 motion-safe:animate-pulse'></span>
        </span>
      </div>
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
