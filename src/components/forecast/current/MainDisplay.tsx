import { formatData, getWeekday } from "@/utils/functions";
import { HourlyData, HourlyEntry } from "@/utils/interfaces";
import Icon from "@/components/forecast/ui/Icon";
import List from "../ui/List";

export default function MainDisplay({
  data,
  units,
  index,
}: {
  data: HourlyEntry[];
  units: string;
  index: number;
}) {
  const { date, icon, temperature, summary, ...forecastItems } = formatData(
    units,
    data[index],
  );

  return (
    <div className='pb-6'>
      <div className='grid grid-cols-2 gap-4 pb-8'>
        <div className='flex flex-col'>
          <p className='text-lg font-bold pb-2'>
            {`${getWeekday(date)[0]}, ${new Date(date).getHours().toString().padStart(2, "0")}:${new Date(date).getMinutes().toString().padStart(2, "0")}`}
          </p>
          <p className='text-md pb-17'>{summary}</p>
          <p className='font-montserrat font-bold text-4xl mt-auto'>
            {temperature}
          </p>
        </div>
        <Icon id={icon} />
      </div>
      <List data={forecastItems} className='xs:grid grid-cols-2 gap-x-6' />
    </div>
  );
}
