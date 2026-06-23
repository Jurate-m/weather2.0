import {
  getDay,
  getMonth,
  weekDays,
  getDayOfWeek,
  time,
  getUnits,
} from "@/utils/functions";
import Icon from "../ui/Icon";

export default function ListingItem({
  data,
  units,
}: {
  data: any;
  units: string;
}) {
  const {
    date,
    icon,
    summary,
    temperature,
    feels_like,
    wind,
    precipitation,
    uv_index,
    humidity,
  } = data;

  const details = [
    {
      name: "Feels like",
      val: feels_like,
      units: getUnits(units, "temperature"),
    },
    {
      name: "Wind",
      val: wind.speed,
      units: `${wind.dir} ${getUnits(units, "speed")}`,
    },
    {
      name: "Precipitation",
      val: precipitation.total,
      units: getUnits(units, "precipitation"),
    },
    { name: "UV Index", val: uv_index, units: "" },
    { name: "Humidity", val: humidity, units: getUnits(units, "humidity") },
  ];
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
        {details.map((detail) => {
          return (
            <li key={detail.name}>
              <h3>{detail.name}</h3>
              <p>
                {detail.val} <span>{detail.units}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
