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
  return <div className='h-41'></div>;
}

export function NavSkeleton() {
  return <div className='block h-14 border-b-2 w-full '></div>;
}

export function NavLinkSkeleton() {
  return (
    <div className='block px-1'>
      <div className='block h-10 w-17.5 bg-stone-100 motion-safe:animate-pulse'></div>
    </div>
  );
}

export function SearchSkeleton() {
  return <div className='h-10 bg-grey-100 motion-safe:animate-pulse'></div>;
}
