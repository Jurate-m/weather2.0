import Link from "next/link";

export default function Button({
  href,
  title,
  className,
  children,
}: {
  href: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${className} inline-block font-bold py-2 px-4 bg-yellow-400 hover:bg-amber-400`}
    >
      {title}
      {children}
    </Link>
  );
}
