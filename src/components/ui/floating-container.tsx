// it works

export default function FloatingContainer({
  components,
  displayCondition,
  className,
}: {
  components: React.ReactNode[];
  displayCondition: boolean[];
  className?: string;
}) {
  if (components.length !== displayCondition.length) return;

  return (
    <div
      className={[
        "absolute z-10 top-[calc(100%+5px)] left-0 w-full bg-elevated md:rounded-xl shadow-md shadow-shdw overflow-hidden",
        className,
      ].join(" ")}
    >
      {components.length &&
        components.map((component, i) => (
          <>
            {displayCondition[i] && (
              <div className='border border-border'>{component}</div>
            )}
          </>
        ))}
    </div>
  );
}
