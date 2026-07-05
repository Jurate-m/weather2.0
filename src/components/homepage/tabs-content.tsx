import Card from "../ui/card";
import { time, getUnits } from "@/utils/functions";

import drop from "@/assets/drop.svg";
import temp from "@/assets/temp.svg";
import windIcon from "@/assets/wind.svg";

import Drop from "../ui/icons/Drop";
import Temp from "../ui/icons/Temp";
import Wind from "../ui/icons/Wind";

import ForecastDetailsItem from "./foreacst-details-list";

import Icon from "../ui/Icon";

const forecastDetails = (item: any, units: string) => {
  const { feels_like, wind, humidity, precipitation } = item;
  return [
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
  ];
};

export default function TabsContent({
  data,
  units,
  index,
}: {
  data: any;
  units: string;
  index: number;
}) {
  return (
    <Card className='bg-card-2  border-accent!'>
      <ul className=''>
        {data.map((item: any, i: number) => {
          const { date, summary, icon, temperature } = item;

          const details = forecastDetails(item, units);

          return (
            <li
              key={item.date}
              className={[index !== i ? "hidden" : undefined, ""].join(" ")}
            >
              <div className='pb-4'>
                <div className='flex justify-between items-end'>
                  <div className='xs:flex flex-row-reverse gap-4'>
                    <div className=''>
                      <h3 className='text-sm'>
                        <time dateTime={date}>{time(date)}</time>
                      </h3>
                      <p className='font-semibold'>{summary}</p>
                    </div>
                    <Icon iconId={icon} className='w-20' />
                  </div>
                  <p className='text-4xl font-semibold text-right'>
                    {Math.round(temperature)}
                    <span className='text-lg align-top'>
                      {getUnits(units, "temperature")}
                    </span>
                  </p>
                </div>
              </div>
              <ul className='grid sm:grid-cols-2 md:grid-cols-4 gap-2'>
                {details.map((detail, i) => {
                  return (
                    <ForecastDetailsItem
                      key={i}
                      item={detail}
                      icon={detail.icon}
                      className='bg-elevated'
                    />
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
