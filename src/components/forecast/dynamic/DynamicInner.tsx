import { HourlyEntry, DailyEntry } from "@/utils/interfaces";

import Icon from "../ui/Icon";

import { formatData, formatDate } from "@/utils/functions";

import List from "../ui/List";
import ListItemCta from "../ui/ListItemCta";

export default function Dropdown({
  data,
  units,
}: {
  data: HourlyEntry[] | DailyEntry[];
  units: string;
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
            key={index}
            buttonChildren={
              <div className='grid grid-cols-4 xs:grid-cols-3 gap-4 items-center py-2 px-4 xs:py-4'>
                <p className='col-span-2 xs:col-span-1 text-left xs:text-center'>
                  {formatDate(date)}
                </p>
                <Icon id={icon} className='h-10' />
                <p>{temperature}</p>
              </div>
            }
            content={
              <>
                <p className='px-4'>{summary}</p>
                <List data={rest} />
              </>
            }
          />
        );
      })}
    </ul>
  );
}
