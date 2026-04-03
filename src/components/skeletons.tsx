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
    <div className='max-w-5xl m-auto px-5 py-4 flex flex-col'>
      <div className='block w-full'>
        <span className='block py-4'>
          <span className='ml-auto block h-10 w-70 py-4 bg-gray-200 motion-safe:animate-pulse'></span>
        </span>
      </div>
      <div className='py-4 max-w-sm w-full ml-auto relative'>
        <div className='h-[56px] bg-gray-200 motion-safe:animate-pulse'></div>
      </div>
    </div>
  );
}

export function WrapperSkeleton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`block mx-auto ${className}`}>
      <span className='block h-10 w-40 mb-6 bg-gray-200 motion-safe:animate-pulse'></span>
      {children}
    </span>
  );
}

export function HomeForecastSkeleton() {
  return (
    <>
      <div>
        <span className='block pb-6'>
          <span className='block h-[400px] w-full bg-gray-200 motion-safe:animate-pulse'></span>
        </span>
        <span className='grid grid-cols-3 xs:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] py-4 gap-x-1'>
          <span className='block w-full h-[136px] bg-gray-200 motion-safe:animate-pulse'></span>
        </span>
      </div>
    </>
  );
}

export function DynamicSkeleton() {
  return (
    <WrapperSkeleton className='narrow'>
      <div className='grid gap-6'>
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <span
              key={index}
              className='block h-18 w-full bg-gray-200 motion-safe:animate-pulse'
            ></span>
          );
        })}
      </div>
    </WrapperSkeleton>
  );
}
