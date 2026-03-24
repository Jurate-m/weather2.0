import { HourlyEntry } from "./interfaces";

export function isValidQuery(value: string) {
  return /^[\p{L}0-9 ,\-]{1,50}$/u.test(value);
}

const UNITS = new Map();

UNITS.set("metric", {
  temperature: "\u00B0C",
  precipitation: "mm/h",
  wind_speed: "m/s",
  pressure: "hPa",
  humidity: "\u0025",
});

UNITS.set("us", {
  temperature: "\u00B0F",
  precipitation: "in/h",
  wind_speed: "mph",
  pressure: "Hg",
  humidity: "\u0025",
});

UNITS.set("uk", {
  temperature: "\u00B0C",
  precipitation: "mm/h",
  wind_speed: "mph",
  pressure: "hPa",
  humidity: "\u0025",
});

UNITS.set("ca", {
  temperature: "\u00B0C",
  precipitation: "mm/h",
  wind_speed: "km/h",
  pressure: "kPa",
  humidity: "\u0025",
});

export function formatData(units = "metric", data: HourlyEntry) {
  // const date = data.day || data.date;

  // const icon = data.icon_num || (typeof data.icon !== "string" ? data.icon : 0);
  return {
    // date: date ?? "",
    date: data.date,
    // icon,
    icon: data.icon,
    summary: data.summary,
    temperature: `${Math.round(data.temperature)}${UNITS.get(units)["temperature"]}`,
    "Feels Like": `${Math.round(data.feels_like)}${UNITS.get(units)["temperature"]}`,
    Wind: `${Math.round(data.wind.speed)}${UNITS.get(units)["wind_speed"]} ${data.wind.dir}`,
    Pressure: `${Math.round(data.pressure)}${UNITS.get(units)["pressure"]}`,
    Humidity: `${Math.round(data.humidity)}${UNITS.get(units)["humidity"]}`,
  };
}

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getWeekday(date: string) {
  return weekDays[new Date(date).getDay()];
}

// export function formatArrayOfData(units = "metric", array: ForecastEntry[]) {
//   return array.map((item) => {
//     return formatData(units, item);
//   });
// }
