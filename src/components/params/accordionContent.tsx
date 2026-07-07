import { forecastDetails } from "@/utils/forecast-details";

type AccordionContentType = {
  data: any;
  units: string;
};

export default function AccordionContent({
  data,
  units,
}: AccordionContentType) {
  const details = forecastDetails(
    [
      "feels_like",
      "wind",
      "precipitation",
      "humidity",
      "uv_index",
      "temperature_min",
      "temperature_max",
      "pressure",
    ],
    data,
    units,
  );

  return (
    <ul className='flex flex-wrap bg-secondary py-4 px-4 border-t border-border gap-y-2 sm:gap-x-2 sm:justify-between'>
      {details.map((item) => {
        const { key, name, val, unit } = item;
        return (
          <li key={key} className='w-1/2 sm:w-auto'>
            <h3 className='text-sm text-font-secondary font-bold'>
              {name.toUpperCase()}
            </h3>
            <p className='font-bold'>
              {Math.round(val)}{" "}
              <span className='font-medium text-sm'>{unit}</span>
            </p>
          </li>
        );
      })}
    </ul>
  );
}
