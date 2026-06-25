import { getUnits } from "@/utils/functions";

type AccordionContentType = {
  data: any;
  units: string;
  param: "daily" | "hourly";
};

export default function AccordionContent({
  data,
  units,
  param,
}: AccordionContentType) {
  const {
    feels_like,
    wind,
    precipitation,
    humidity,
    uv_index,
    temperature_min,
    temperature_max,
    pressure,
  } = data;

  const daily = param === "daily";

  const details = [
    temperature_min
      ? {
          title: "Temperature min",
          val: temperature_min,
          units: getUnits(units, "temperature"),
        }
      : null,
    temperature_max
      ? {
          title: "Temperature max",
          val: temperature_max,
          units: getUnits(units, "temperature"),
        }
      : null,
    daily
      ? null
      : {
          title: "Feels like",
          val: feels_like,
          units: getUnits(units, "temperature"),
        },
    {
      title: "Wind",
      val: wind.speed,
      units: `${wind.dir} ${getUnits(units, "speed")}`,
    },
    {
      title: "Precipitation",
      val: precipitation.total,
      units: getUnits(units, "precipitation"),
    },
    { title: "Humidity", val: humidity, units: getUnits(units, "humidity") },
    uv_index ? { title: "UV Index", val: uv_index, units: "" } : null,

    { title: "Pressure", val: pressure, units: getUnits(units, "pressure") },
  ];

  return (
    <ul className='flex flex-wrap bg-secondary py-4 px-4 border-t border-border gap-y-2 sm:gap-x-2 sm:justify-between'>
      {details.map((item) => {
        console.log(item);
        if (item) {
          const { title, val, units } = item;
          return (
            <li key={title} className='w-1/2 sm:w-auto'>
              <h3 className='text-sm text-font-1 font-bold'>
                {title.toUpperCase()}
              </h3>
              <p className='font-bold'>
                {Math.round(val)}{" "}
                <span className='font-medium text-sm'>{units}</span>
              </p>
            </li>
          );
        }
      })}
    </ul>
  );
}
