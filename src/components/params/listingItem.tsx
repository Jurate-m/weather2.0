import {
  getDay,
  getMonth,
  weekDays,
  getDayOfWeek,
  time,
  getUnits,
} from "@/utils/functions";
import Icon from "../ui/Icon";

import { forecastDetails } from "@/utils/forecast-details";

export default function ListingItem({
  data,
  units,
}: {
  data: any;
  units: string;
}) {
  const { date, icon, summary, temperature } = data;

  const details = forecastDetails(
    ["feels_like", "wind", "precipitation", "uv_index", "humidity"],
    data,
    units,
  );

  return (
    <li className='py-5 px-5'>
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <time dateTime={date}>
            {weekDays[getDayOfWeek(date)][0]} {time(date)}
            <span className='block text-sm'>
              {getMonth(date)[0]} {getDay(date)}
            </span>
          </time>
          <Icon iconId={icon} className='h-10' />
          <span>{summary}</span>
        </div>
        <span>
          {Math.round(temperature)}{" "}
          <span>{getUnits(units, "temperature")}</span>
        </span>
      </div>
      <ul>
        {details.map((item) => {
          const { key, name, val, unit } = item;
          return (
            <li key={key}>
              <h3>{name}</h3>
              <p>
                {val} <span>{unit}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
