import Button from "./Button";

type CtaListProps = {
  data: { id: string; title: string; subtitle?: string }[] | null;
  ctaDisabled: (args?: any) => boolean;
  onClick: (args?: any) => void;
  [propName: string]: any;
};

export default function CtaList({
  data,
  ctaDisabled,
  onClick,
  ...props
}: CtaListProps) {
  return (
    <ul role='listbox' aria-label='Search results' {...props}>
      {data &&
        data.map((item) => {
          const disabled = ctaDisabled();

          const title = (
            <>
              <span className='font-bold'>{item.title}</span>
              {item.subtitle ? `, ${item.subtitle}` : null}
            </>
          );

          return (
            <li key={item.id}>
              <Button
                disabled={disabled}
                onClick={() => onClick(item.id)}
                className={`w-full text-left py-1 px-2 rounded-md ${disabled ? "text-gray-400" : ""}`}
                label={title}
              />
            </li>
          );
        })}
    </ul>
  );
}
