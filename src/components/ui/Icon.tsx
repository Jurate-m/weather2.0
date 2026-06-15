export default function Icon({
  iconId,
  title,
  aspectRatio,
  ...props
}: {
  iconId: number | string;
  title?: React.ReactNode;
  aspectRatio?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <svg
        className={[
          "block w-full max-h-full ",
          aspectRatio ?? "aspect-square",
        ].join(" ")}
      >
        {title && <title>{title}</title>}
        <use href={`/assets/sprite.svg#${iconId}`} />
      </svg>
    </div>
  );
}
