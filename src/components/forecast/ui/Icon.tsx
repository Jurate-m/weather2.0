export default function Icon({
  id,
  ...className
}: {
  id: number;
  className?: string;
}) {
  return (
    <div {...className}>
      <svg className='w-full max-w-full h-full'>
        <use href={`/assets/weather-sprite.svg#icon-${id}`} />
      </svg>
    </div>
  );
}
