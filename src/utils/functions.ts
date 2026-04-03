import { HourlyEntry, DailyEntry, FormattedObj } from "./interfaces";

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

const roundWithUnits = (value: number, units: string, unit: string) =>
  `${Math.round(value)}${UNITS.get(units)[unit]}`;

export function formatData(units = "metric", data: HourlyEntry | DailyEntry) {
  const date = "date" in data ? data.date : data.day;
  const icon = Number(data.icon);
  const summary = data.summary;
  const temperature =
    "temperature_min" in data && "temperature_max" in data
      ? `${roundWithUnits(data.temperature_max, units, "temperature")} / ${roundWithUnits(data.temperature_min, units, "temperature")}`
      : `${roundWithUnits(data.temperature, units, "temperature")}`;
  const feels_like =
    "feels_like_min" in data && "feels_like_max" in data
      ? `${roundWithUnits(data.feels_like_max, units, "temperature")} / ${roundWithUnits(data.feels_like_min, units, "temperature")}`
      : `${roundWithUnits(data.feels_like, units, "temperature")}`;
  const wind = `${roundWithUnits(data.wind.speed, units, "wind_speed")} ${data.wind.dir}`;
  const pressure = roundWithUnits(data.pressure, units, "pressure");
  const humidity = roundWithUnits(data.humidity, units, "humidity");

  const probability = Object.entries(data.probability)
    .filter(([key, value]) => value)
    .map(([key, value]) => {
      return {
        [`Probability of ${key}`]: roundWithUnits(value, units, "humidity"),
      };
    });

  return {
    date,
    icon,
    summary,
    temperature,
    "Feels Like": feels_like,
    Wind: wind,
    Pressure: pressure,
    Humidity: humidity,
    ...Object.assign({}, ...probability),
    ...("uv_index" in data
      ? { "UV Index": data.uv_index ? data.uv_index : 0 }
      : {}),
  } as FormattedObj;
}

export const weekDays = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"],
];

export function getDay(date: string) {
  return new Date(date).getDay();
}

export function getWeekday(date: string) {
  return weekDays[getDay(date)];
}

function testTime(date: string): boolean {
  return /T\d{2}:\d{2}/.test(date);
}

function padDate(date: number) {
  return String(date).padStart(2, "0");
}

export function padHours(date: string) {
  return `${padDate(new Date(date).getHours())}:00`;
}

export function formatDate(date: string) {
  const dateObj = new Date(date);

  const weekDay = getWeekday(String(dateObj))[0];
  const time = `${padDate(dateObj.getHours())}:00`;
  const day = padDate(dateObj.getDate());
  const month = padDate(dateObj.getMonth());

  const daily = `${weekDay}, ${day}/${month}`;
  const hourly = `${weekDay}, ${time}`;

  return testTime(String(date)) ? hourly : daily;
}
