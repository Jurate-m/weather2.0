export default function Icon({
  iconId,
  title,
  ...props
}: {
  iconId: number;
  title?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <svg className='w-full max-w-full h-full'>
        {title && <title>{title}</title>}
        <use href={`/assets/sprite.svg#icon-${iconId}`} />
      </svg>
    </div>
  );
}
