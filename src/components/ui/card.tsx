type CardType = {
  children: React.ReactNode;
  [prop: string]: any;
};

export default function Card({ children, className, ...props }: CardType) {
  return (
    <div
      className={[
        "rounded-xl py-5 px-5 border border-font-1/10",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
