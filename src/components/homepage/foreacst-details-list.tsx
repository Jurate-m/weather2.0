import Card from "../ui/card";

export default function ForecastDetailsItem({
  item,
  icon,
  className,
}: {
  item: any;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <li>
      <Card className={["py-2.5! px-2.5!", className].join(" ")}>
        <span className='flex gap-1 pb-1'>
          {icon}
          <h3 className='text-sm font-semibold'>{item.name.toUpperCase()}</h3>
        </span>
        <p className='font-semibold text-xl'>
          {Math.round(item.val)}{" "}
          <span className='font-normal text-sm'>{item.unit}</span>
        </p>
      </Card>
    </li>
  );
}
