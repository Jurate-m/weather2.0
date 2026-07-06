import Card from "../ui/card";
import {
  getDay,
  getMonth,
  weekDays,
  getDayOfWeek,
  getUnits,
} from "@/utils/functions";
import ForecastDetailsItem from "./foreacst-details-list";
import Icon from "../ui/Icon";
import Drop from "../ui/icons/Drop";
import Temp from "../ui/icons/Temp";
import Wind from "../ui/icons/Wind";
import Eye from "../ui/icons/Eye";
import Press from "../ui/icons/Press";

type CurrentDetailsType = {
  location: {
    name: string | null;
    country: string | null;
  };
  units: string;
  data: any;
  className?: string;
};

export default async function CurrentDetails({
  location,
  units,
  data,
  className,
}: CurrentDetailsType & React.HTMLAttributes<HTMLDivElement>) {
  const {
    date,
    humidity,
    icon,
    feels_like,
    temperature,
    precipitation,
    pressure,
    summary,
    visibility,
    wind,
  } = data;

  const details = [
    {
      name: "Feels like",
      val: Math.round(feels_like),
      unit: getUnits(units, "temperature"),
      icon: <Temp fill='var(--color-font-primary)' />,
    },
    {
      name: "Wind",
      val: Math.round(wind.speed),
      unit: `${getUnits(units, "speed")} ${wind.dir}`,
      icon: <Wind fill='var(--color-font-primary)' />,
    },
    {
      name: "Humidity",
      val: Math.round(humidity),
      unit: getUnits(units, "humidity"),
      icon: <Drop fill='var(--color-font-primary)' />,
    },
    {
      name: "Precipitation",
      val: Math.round(precipitation.total),
      unit: getUnits(units, "humidity"),
      icon: <Drop fill='var(--color-font-primary)' />,
    },
    {
      name: "Visibility",
      val: Math.round(visibility),
      unit: getUnits(units, "visibility"),
      icon: <Eye fill='var(--color-font-primary)' />,
    },
    {
      name: "Pressure",
      val: Math.round(pressure),
      unit: getUnits(units, "pressure"),
      icon: <Press fill='var(--color-font-primary)' />,
    },
  ];

  const weekday = weekDays[getDayOfWeek(date)][1];

  const month = getMonth(date)[1];
  const day = getDay(date);

  return (
    <>
      <Card className={["bg-card-1 overflow-hidden", className].join(" ")}>
        <div className='xs:grid grid-cols-5 pb-4 relative'>
          <div className='col-span-3 flex flex-col justify-between relative z-10 '>
            <div>
              <h1 className='font-semibold'>
                {location.name}, {location.country}
              </h1>
              <span className='block text-sm pb-4'>
                {weekday}, {month} {day}
              </span>
            </div>
            <div>
              <span className='text-6xl block font-bold'>
                {Math.round(temperature)}
                <span className='text-lg align-top'>
                  {getUnits(units, "temperature")}
                </span>
              </span>
              <span className='block text-lg font-semibold'>{summary}</span>
            </div>
          </div>
          <Icon
            iconId={icon}
            className='absolute xs:static -right-25 bottom-4 w-full col-span-2 mt-auto'
            aspectRatio='aspect-2/1'
          />
        </div>
        <ul className='grid xs:grid-cols-2 gap-2'>
          {details.map((item) => {
            return (
              <ForecastDetailsItem
                key={item.name}
                item={item}
                icon={item.icon}
                className='bg-elevated'
              />
            );
          })}
        </ul>
      </Card>
    </>
  );
}
