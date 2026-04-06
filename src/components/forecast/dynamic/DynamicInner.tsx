import { HourlyEntry, DailyEntry } from "@/utils/interfaces";

import Icon from "../../ui/Icon";

import { formatData, formatDate } from "@/utils/functions";

import List from "../../ui/List";
import ListItemCta from "../../ui/ListItemCta";

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
          <li key={`${page}-${index}`}>
            <ListItemCta
              btnClass='py-2 pl-6 xs:py-4'
              buttonChildren={
                <div className='grid grid-cols-[max-content_max-content] justify-between xs:grid-cols-[1fr_max-content_max-content_max-content] gap-4 items-center '>
                  <time dateTime={date} className='text-left font-medium'>
                    {formatDate(date)}
                  </time>
                  <Icon
                    iconId={icon}
                    className='w-15 h-10 hidden xs:block'
                    aria-hidden='true'
                  />
                  <p className='font-medium'>{temperature}</p>
                </div>
              }
              content={
                <>
                  <div className='flex items-center py-2 px-6 xs:px-8 justify-between'>
                    <p className='font-medium pr-4 xs:pr-0'>{summary}</p>
                    <Icon
                      iconId={icon}
                      className='w-15 h-10 block xs:hidden'
                      aria-hidden='true'
                    />
                  </div>

                  <List
                    data={rest}
                    className='
                    xs:grid grid-cols-2 gap-x-6 p-4'
                  />
                </>
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
