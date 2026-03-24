import { formatData } from "@/utils/functions";
import { HourlyData, HourlyEntry } from "@/utils/interfaces";
import Icon from "@/components/forecast/ui/Icon";

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
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] py-4 divide-x-4 divide-gray-950/2'>
      {data.map((item, id) => {
        const formattedData = formatData(units, item);
        const { date, temperature, icon } = formattedData;

        return (
          <li key={date} className=''>
            <button
              onClick={() => {
                onSelect(id);
              }}
              className={`${id === index ? "bg-gray-950/2" : ""} block w-full px-6 py-4`}
            >
              <p className='pb-2'>{`${new Date(date).getHours().toString().padStart(2, "0")}:${new Date(date).getMinutes().toString().padStart(2, "0")}`}</p>
              <Icon id={icon} className='h-10 pb-2' />
              <p className='font-bold'>{temperature}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
