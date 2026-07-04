export default function Error({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h1 className='text-5xl pb-4 font-bold'>Oh no!</h1>
      {children}
    </section>
  );
}
