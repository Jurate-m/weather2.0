import { DailyData, HourlyData } from "@/utils/interfaces";
import {
  fetchDailyWeather,
  fetchHourlyWeather,
  dailyForecastData,
  forecastData,
} from "@/lib/data";

import DynamicInner from "./DynamicInner";

export default async function DynamiContainer({
  params,
  locationID,
}: {
  params: string;
  locationID: string;
}) {
  "use cache";

  let data: DailyData | HourlyData | null = null;

  if (params === "daily") data = dailyForecastData;

  if (params === "hourly") data = forecastData;

  if (!data) return; //error

  // @ts-ignore
  const forecast = data[params].data;
  const units = data.units;

  if (!forecast) return; // error

  return (
    <div>
      <DynamicInner data={forecast} units={units} />
    </div>
  );
}
