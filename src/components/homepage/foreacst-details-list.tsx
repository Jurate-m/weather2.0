import Image from "next/image";
import Card from "../ui/card";

export default function ForecastDetailsItem({
  item,
  className,
}: {
  item: any;
  className?: string;
}) {
  return (
    <li>
      <Card className={["py-2.5! px-2.5!", className].join(" ")}>
        <span className='flex gap-1 pb-1'>
          <Image src={item.icon} alt={item.name} width={20} height={20} />
          <h3 className='text-sm font-semibold'>{item.name.toUpperCase()}</h3>
        </span>
        <p className='font-semibold text-xl'>
          {item.val} <span className='font-normal text-sm'>{item.unit}</span>
        </p>
      </Card>
    </li>
  );
}
