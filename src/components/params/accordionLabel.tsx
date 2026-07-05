import Image from "next/image";
import {
  getDay,
  getMonth,
  weekDays,
  getDayOfWeek,
  time,
  getUnits,
} from "@/utils/functions";
import Icon from "../ui/Icon";
import Chevron from "../ui/icons/Chevron";

type AccordionLabelType = {
  data: any;
  dateKey: string;
  param: "daily" | "hourly";
  units: string;
};

export default function AccordionLabel({
  data,
  dateKey,
  param,
  units,
}: AccordionLabelType) {
  const { icon, summary, temperature, temperature_min, temperature_max } = data;

  const date = data[dateKey];
  const daily = param === "daily";
  const description = daily ? summary.split(".")[0] : summary;
  const forecastTime = daily ? "" : time(date);
  const temp = daily ? undefined : temperature;

  return (
    <div className='py-4 px-4'>
      <div className='flex gap-2 items-center'>
        <div className='flex justify-between flex-1 items-center pb-2 sm:pb-0'>
          <div className='flex gap-2 sm:gap-4 text-left items-center'>
            <Icon iconId={icon} className='h-10 sm:h-12 sm:hidden' />
            <time dateTime={date} className='text-sm sm:text-base sm:font-bold'>
              {weekDays[getDayOfWeek(date)][0]} {forecastTime}
              <span className='block text-sm font-semibold'>
                {getMonth(date)[0]} {getDay(date)}
              </span>
            </time>
            <Icon iconId={icon} className='h-10 hidden sm:block' />
            <span className='hidden sm:block font-medium'>{description}</span>
          </div>
          <span className='font-semibold'>
            {temperature_min && (
              <span>
                {Math.round(temperature_max)}/
                <span className='text-font-secondary'>
                  {Math.round(temperature_min)}
                </span>
              </span>
            )}
            {temp && Math.round(temp)}{" "}
            <span className='text-sm'>{getUnits(units, "temperature")}</span>
          </span>
        </div>
        <Chevron
          fill='var(--color-accent)'
          className='chevron'
          aria-hidden='true'
        />
      </div>
      <span className='font-medium text-left text-sm block sm:hidden'>
        {description}
      </span>
    </div>
  );
}
