interface BtnProps {
  label?: string | React.ReactNode;
  onClick: (e?: any) => void;
  [propName: string]: any;
}

export default function Button({ label, onClick, ...props }: BtnProps) {
  return (
    <button type='button' onClick={onClick} {...props}>
      {label}
    </button>
  );
}
