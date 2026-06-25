import { fetchDailyWeather, fetchHourlyWeather } from "@/_lib/data";
import { getDay, weekDays, getDayOfWeek } from "@/utils/functions";

export const getForecast = async (slug: string, id: string, page: number) => {
  const forecastFetch =
    slug === "daily"
      ? await fetchDailyWeather(id)
      : await fetchHourlyWeather(id);

  const units = forecastFetch.units;

  const slugForecast = forecastFetch[slug].data;

  const entryDateKey = "day" in slugForecast[0] ? "day" : "date";

  const length = slugForecast.length;

  const firstDay = getDay(slugForecast[0].date);

  const hourlyDataFirst = slugForecast.filter(
    (item: any) => getDay(item.date) === firstDay,
  );

  const hourlyDataRest = slugForecast.slice(hourlyDataFirst.length);

  const itemsPerPage = slug === "daily" ? 7 : 24;

  const dailyTotalPages = slugForecast.length / itemsPerPage;

  const hourlyTotalPages = hourlyDataRest.length / itemsPerPage + 1;

  const totalPages = Math.ceil(
    slug === "daily" ? dailyTotalPages : hourlyTotalPages,
  );

  const currentPage = Math.min(page, totalPages);

  const hourlyData =
    !currentPage || currentPage === 1
      ? hourlyDataFirst
      : hourlyDataRest.slice(
          (currentPage - 2) * itemsPerPage,
          itemsPerPage * (currentPage - 1),
        );

  const data =
    slug === "daily"
      ? slugForecast.slice(
          (currentPage - 1) * itemsPerPage,
          itemsPerPage * currentPage,
        )
      : hourlyData;

  const dailyPagination = {
    prev: "Previous week",
    next: "Next week",
  };

  const hourlyPagination = {
    prev: weekDays[(getDayOfWeek(data[0][entryDateKey]) - 1 + 7) % 7][1],
    next: weekDays[(getDayOfWeek(data[0][entryDateKey]) + 1) % 7][1],
  };

  const pagination = slug === "daily" ? dailyPagination : hourlyPagination;

  return {
    data,
    entryDateKey,
    units,
    currentPage,
    totalPages,
    pagination,
    length,
  };
};
