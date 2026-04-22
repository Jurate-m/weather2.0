export default function Error({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h1 className='text-5xl pb-4 font-bold'>There was a problem!</h1>
      {children}
    </section>
  );
}
