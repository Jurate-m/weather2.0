import { formatData, padHours } from "@/utils/functions";
import { HourlyData, HourlyEntry } from "@/utils/interfaces";
import Icon from "@/components/ui/Icon";

export default function TabsContainer({
  data,
  units,
  onSelect,
  index,
}: {
  data: HourlyEntry[];
  units: string;
  onSelect: (id: number) => void;
  index: number;
}) {
  return (
    <ul
      role='tablist'
      aria-label='Hourly forecast'
      className='grid grid-cols-3 xs:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] py-4 divide-x-4 divide-gray-950/2'
    >
      {data.map((item, id) => {
        const formattedData = formatData(units, item);
        const { date, temperature, icon, summary } = formattedData;

        return (
          <li key={String(date)} className=''>
            <button
              role='tab'
              aria-selected={id === index}
              onClick={() => {
                onSelect(id);
              }}
              className={`${id === index ? "bg-gray-950/2" : ""} w-full p-4 grid grid-flow-row gap-2`}
            >
              <time dateTime={date}>{`${padHours(date)}`}</time>
              <Icon iconId={icon} title={summary} className='h-10' />
              <p className='font-bold'>{temperature}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
