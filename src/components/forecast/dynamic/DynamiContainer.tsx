import { fetchDailyWeather, fetchHourlyWeather } from "@/lib/data";
import { HourlyEntry } from "@/utils/interfaces";
import { weekDays, getDay } from "@/utils/functions";

import DynamicInner from "./DynamicInner";
import Pagination from "../../ui/Pagination";

async function getData(locationID: string, param: string, page: number) {
  "use cache";

  let firstPageForecasts = [];
  let restForecasts = [];
  let prevPagination = "";
  let nextPagination = "";

  const forecast =
    param === "daily"
      ? await fetchDailyWeather(locationID)
      : await fetchHourlyWeather(locationID);

  if (!forecast) return;

  const units = forecast.units;

  const data = JSON.parse(
    // @ts-ignore
    JSON.stringify(param in forecast ? forecast[param].data : null),
  );

  if (!data) return null;

  // * get first entry date
  const entryDate = "day" in data[0] ? data[0].day : data[0].date;

  // * get first entry day of month
  const firstEntryDay = getDay(entryDate); // * if Monday -> 1, if Tuesday -> 2

  if (param === "daily") {
    firstPageForecasts = data.slice(0, weekDays.length - firstEntryDay + 1);

    restForecasts = data.slice(firstPageForecasts.length);

    // * name of previous day, name for next day
    prevPagination = "Previous Week";
    nextPagination = "Next Week";
  }

  if (param === "hourly") {
    firstPageForecasts = data.filter(
      (item: HourlyEntry) => getDay(item.date) === firstEntryDay,
    );

    restForecasts = data.slice(firstPageForecasts.length);
  }

  const amountPerPage = param === "hourly" ? 24 : 7;

  const totalPages = Math.ceil(restForecasts.length / amountPerPage) + 1;

  const currPage = Math.min(page, totalPages);

  const forecastData1 = restForecasts.slice(
    (currPage - 2) * amountPerPage,
    (currPage - 1) * amountPerPage,
  );

  const dataForPage =
    !currPage || currPage === 1 ? firstPageForecasts : forecastData1;

  if (param === "hourly") {
    const firstPage = !currPage || currPage === 1;
    const lastPage = currPage && currPage === totalPages;

    prevPagination = firstPage
      ? ""
      : weekDays[getDay(forecastData1[0].date) - 1][1];

    nextPagination = firstPage
      ? weekDays[getDay(firstPageForecasts[0].date) + 1][1]
      : lastPage
        ? ""
        : weekDays[getDay(forecastData1[0].date) + 1][1];
  }

  const pagination = [prevPagination, nextPagination];

  return { data: dataForPage, units, totalPages, currPage, pagination };
}

export default async function DynamiContainer({
  params,
  locationID,
  page,
}: {
  params: string;
  locationID: string;
  page: number;
}) {
  "use cache";

  const forecast = await getData(locationID, params, page);

  if (!forecast) return; //error

  const { data, units, totalPages, currPage, pagination } = forecast;

  if (!forecast) return; // error

  return (
    <div>
      <DynamicInner data={data} units={units} page={currPage} />
      <Pagination page={page} totalPages={totalPages} pagination={pagination} />
    </div>
  );
}
