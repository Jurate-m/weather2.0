import Image from "next/image";
import chevron from "@/assets/chevron.svg";

import { getForecast } from "@/_lib/forecast";
import {
  getDay,
  getMonth,
  weekDays,
  getDayOfWeek,
  time,
  getUnits,
} from "@/utils/functions";
import Pagination from "../ui/Pagination";
import Accordion from "../ui/accordion";
import Icon from "../ui/Icon";

const Label = ({ data, units }: { data: any; units: string }) => {
  const { date, icon, summary, temperature } = data;

  return (
    <div className='flex gap-4 py-4 px-4'>
      <div className='flex flex-1 justify-between items-center'>
        <div className='text-left sm:flex gap-2 sm:gap-4 items-center'>
          <div className='flex gap-2 sm:gap-4'>
            <Icon iconId={icon} className='h-10 sm:h-12 sm:hidden' />
            <time dateTime={date} className='text-sm sm:text-base sm:font-bold'>
              {weekDays[getDayOfWeek(date)][0]} {time(date)}
              <span className='block text-sm sm:font-medium'>
                {getMonth(date)[0]} {getDay(date)}
              </span>
            </time>
          </div>
          <Icon iconId={icon} className='h-10 hidden sm:block' />
          <span className='font-semibold'>{summary}</span>
        </div>
        <span className='font-semibold'>
          {Math.round(temperature)}{" "}
          <span className='text-sm'>{getUnits(units, "temperature")}</span>
        </span>
      </div>
      <Image src={chevron} alt='chevron' aria-hidden='true' />
    </div>
  );
};

const Content = ({ data, units }: { data: any; units: string }) => {
  const { feels_like, wind, precipitation, humidity, uv_index } = data;

  const details = [
    {
      name: "Feels like",
      val: Math.round(feels_like),
      units: getUnits(units, "temperature"),
    },
    {
      name: "Wind",
      val: Math.round(wind.speed),
      units: `${wind.dir} ${getUnits(units, "speed")}`,
    },
    {
      name: "Precipitation",
      val: Math.round(precipitation.total),
      units: getUnits(units, "precipitation"),
    },
    { name: "UV Index", val: Math.round(uv_index), units: "" },
    { name: "Humidity", val: humidity, units: getUnits(units, "humidity") },
  ];

  return (
    <ul className='grid grid-cols-2 sm:grid-cols-3 md:flex justify-between bg-secondary py-4 px-4 gap-2 border-t border-border'>
      {details.map((detail) => {
        return (
          <li key={detail.name}>
            <h3 className='text-sm text-font-1 font-bold'>
              {detail.name.toUpperCase()}
            </h3>
            <p className='font-bold'>
              {detail.val}{" "}
              <span className='font-medium text-sm'>{detail.units}</span>
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default async function ForecastListing({
  name,
  country,
  location_id,
  param,
  page,
}: {
  name: string;
  country: string;
  location_id: string;
  param: string;
  page: number;
}) {
  const { data, units, currentPage, totalPages, pagination, length } =
    await getForecast(param, location_id, page);

  return (
    <>
      <div className='py-6'>
        <h1 className='text-4xl font-semibold pb-2'>Hourly forecast</h1>
        <p className='text-sm font-light'>
          Next {length} hours for {name}, {country}
        </p>
      </div>
      <div className='rounded-xl border border-font-1/10 overflow-hidden'>
        <div>
          {data.map((item: any, i: number) => {
            return (
              <Accordion
                key={item.date}
                label={<Label data={item} units={units} />}
                active={i === 0}
                contentId={item.date}
                content={<Content data={item} units={units} />}
                className='border-b border-border last:border-b-0 [&>button]:hover:bg-secondary [&_img]:transition-transform [&_img]:duration-75 [&_img]:ease-in'
                activeStyles='[&_img]:rotate-90'
              />
            );
          })}
        </div>
      </div>
      <Pagination
        title={pagination}
        page={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
