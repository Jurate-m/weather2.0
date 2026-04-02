export default function Icon({
  id,
  ...className
}: {
  id: number;
  className?: string;
}) {
  return (
    <div {...className}>
      <svg className='w-20 max-w-full h-full'>
        <use href={`/assets/sprite.svg#icon-${id}`} />
      </svg>
    </div>
  );
}
