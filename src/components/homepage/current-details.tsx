import Card from "../ui/card";
import { getDay, getMonth, getWeekday, getUnits } from "@/utils/functions";
import ForecastDetailsItem from "./foreacst-details-list";
import Icon from "../ui/Icon";

import eye from "@/assets/eye.svg";
import drop from "@/assets/drop.svg";
import temp from "@/assets/temp.svg";
import press from "@/assets/press.svg";
import windIcon from "@/assets/wind.svg";

type CurrentDetailsType = {
  location: {
    name: string;
    country: string;
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
  ...props
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
      icon: temp,
    },
    {
      name: "Wind",
      val: Math.round(wind.speed),
      unit: `${getUnits(units, "speed")} ${wind.dir}`,
      icon: windIcon,
    },
    {
      name: "Humidity",
      val: Math.round(humidity),
      unit: getUnits(units, "humidity"),
      icon: drop,
    },
    {
      name: "Precipitation",
      val: Math.round(precipitation.total),
      unit: getUnits(units, "humidity"),
      icon: drop,
    },
    {
      name: "Visibility",
      val: Math.round(visibility),
      unit: getUnits(units, "visibility"),
      icon: eye,
    },
    {
      name: "Pressure",
      val: Math.round(pressure),
      unit: getUnits(units, "pressure"),
      icon: press,
    },
  ];

  const weekday = getWeekday(date)[1];
  const month = getMonth(date)[1];
  const day = getDay(date);

  return (
    <>
      <Card className={["bg-card-1 overflow-hidden", className].join(" ")}>
        <div className='xs:grid grid-cols-5 pb-4 relative'>
          <div className='col-span-3 flex flex-col justify-between relative z-10'>
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
            className='absolute xs:static right-[-30%] bottom-4 w-full col-span-2 mt-auto'
            aspectRatio='aspect-2/1'
          />
        </div>
        <ul className='grid xs:grid-cols-2 gap-2'>
          {details.map((item) => (
            <ForecastDetailsItem
              key={item.name}
              item={item}
              className='bg-white/50'
            />
          ))}
        </ul>
      </Card>
    </>
  );
}
