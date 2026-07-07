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
import { forecastDetails, FIELD_ICONS } from "@/utils/forecast-details";

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
  const { date, icon, temperature, summary } = data;

  const details = forecastDetails(
    [
      "feels_like",
      "wind",
      "humidity",
      "precipitation",
      "visibility",
      "pressure",
    ],
    data,
    units,
  );

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
                icon={FIELD_ICONS[item.key as keyof typeof FIELD_ICONS]}
                className='bg-elevated'
              />
            );
          })}
        </ul>
      </Card>
    </>
  );
}
