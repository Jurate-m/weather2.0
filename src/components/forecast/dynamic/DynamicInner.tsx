import { HourlyEntry, DailyEntry } from "@/utils/interfaces";

import Icon from "../ui/Icon";

import { formatData, formatDate } from "@/utils/functions";

import List from "../ui/List";
import ListItemCta from "../ui/ListItemCta";

export default function Dropdown({
  data,
  units,
  page,
}: {
  data: HourlyEntry[] | DailyEntry[];
  units: string;
  page: number;
}) {
  const formattedData = data.map((entry) => {
    return formatData(units, entry);
  });

  return (
    <ul className='grid gap-6'>
      {formattedData.map((entry, index) => {
        const { date, icon, temperature, summary, ...rest } = entry;

        return (
          <ListItemCta
            key={`${page}-${index}`}
            buttonChildren={
              <div className='grid grid-cols-[1fr_max-content_max-content_max-content] gap-4 items-center '>
                <p className='text-left font-medium'>{formatDate(date)}</p>
                <Icon id={icon} className='w-20 h-10' />
                <p className='font-medium'>{temperature}</p>
              </div>
            }
            content={
              <>
                <p className='px-6 font-medium'>{summary}</p>

                <List
                  data={rest}
                  className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-6 p-4'
                />
              </>
            }
          />
        );
      })}
    </ul>
  );
}
