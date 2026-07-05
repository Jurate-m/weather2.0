export default function GradientBar({
  pos,
  className,
  ...props
}: {
  pos: number;
  className?: string;
  props?: any;
}) {
  const position = Math.round(pos);

  const bubblePosArr = [
    "left-[2%]",
    "left-[9%]",
    "left-[18%]",
    "left-[27%]",
    "left-[36%]",
    "left-[45%]",
    "left-[54%]",
    "left-[63%]",
    "left-[72%]",
    "left-[81%]",
    "left-[90%]",
    "left-[98%]",
  ];

  const posClass =
    position >= bubblePosArr.length - 1
      ? bubblePosArr[bubblePosArr.length - 1]
      : bubblePosArr[position];

  return (
    <div
      className={["rainbow h-5 rounded-xl relative", className].join(" ")}
      {...props}
    >
      <span
        className={[
          "block w-6 h-6 top-[50%] -translate-y-[50%] -translate-x-[50%] absolute rounded-full border-4 border-black dark:border-white bg-white",
          posClass,
        ].join(" ")}
      ></span>
    </div>
  );
}
