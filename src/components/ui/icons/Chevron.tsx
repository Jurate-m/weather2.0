export default function Chevron({
  fill,
  ...props
}: { fill?: string } & React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24px'
      viewBox='0 -960 960 960'
      width='24px'
      fill={fill ?? "#000"}
      {...props}
    >
      <path d='M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z' />
    </svg>
  );
}
