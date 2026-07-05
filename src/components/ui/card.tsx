type CardType = {
  children: React.ReactNode;
  [prop: string]: any;
};

export default function Card({ children, className, ...props }: CardType) {
  return (
    <div
      className={["rounded-xl py-5 px-5 border border-border", className].join(
        " ",
      )}
      {...props}
    >
      {children}
    </div>
  );
}
