const UNITS = new Map();

UNITS.set("metric", {
  temperature: "\u00B0C",
  precipitation: "mm/h",
  speed: "m/s",
  pressure: "hPa",
  visibility: "km",
  humidity: "\u0025",
});

UNITS.set("us", {
  temperature: "\u00B0F",
  precipitation: "in/h",
  speed: "mph",
  pressure: "Hg",
  visibility: "mi",
  humidity: "\u0025",
});

UNITS.set("uk", {
  temperature: "\u00B0C",
  precipitation: "mm/h",
  speed: "mph",
  pressure: "hPa",
  visibility: "mi",
  humidity: "\u0025",
});

UNITS.set("ca", {
  temperature: "\u00B0C",
  precipitation: "mm/h",
  speed: "km/h",
  pressure: "kPa",
  visibility: "km",
  humidity: "\u0025",
});

export const getUnits = (units: string, unit: string) => UNITS.get(units)[unit];

export const weekDays = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"],
];

export const month = [
  ["Jan", "January"],
  ["Feb", "February"],
  ["Mar", "March"],
  ["Apr", "April"],
  ["May", "May"],
  ["Jun", "June"],
  ["Jul", "July"],
  ["Aug", "August"],
  ["Sep", "September"],
  ["Oct", "October"],
  ["Nov", "November"],
  ["Dec", "December"],
];

export function getMonth(date: string) {
  return month[new Date(date).getMonth()];
}

export function getDayOfWeek(date: string | number) {
  return new Date(date).getDay();
}

export function getDay(date: string) {
  return new Date(date).getDate();
}

export function getWeekday(date: string | number) {
  return weekDays[getDayOfWeek(date)];
}

function padDate(date: number) {
  return String(date).padStart(2, "0");
}

export function padHours(date: string) {
  return `${padDate(new Date(date).getHours())}:00`;
}

export function secondsUntilNextHour() {
  const now = new Date();

  return (60 - now.getMinutes()) * 60 - now.getSeconds();
}

export function time(date: Date) {
  return `${String(new Date(date).getHours()).padStart(2, "0")}:${String(new Date(date).getMinutes()).padStart(2, "0")}`;
}

export function astroPhase(phase: string) {
  const joined = phase.split("_").join(" ");
  const firstLetter = joined.charAt(0).toUpperCase();
  const remainder = joined.slice(1);

  return firstLetter + remainder;
}

export const uv_recommendations = [
  {
    category: "Very Low",
    range: [0],
    recommendation: "No protection needed.",
  },
  {
    category: "Low",
    range: [1, 2],
    recommendation: "You can safely stay outside using minimal sun protection.",
  },
  {
    category: "Moderate",
    range: [3, 4, 5],
    recommendation: "Seek shade during late morning through mid-afternoon.",
  },
  {
    category: "High",
    range: [6, 7],
    recommendation:
      "Limit time outdoors during peak sun hours. Generously apply SPF 30+ sunscreen, wear protective clothing, and seek shade.",
  },
  {
    category: "Very High",
    range: [8, 9, 10],
    recommendation:
      "Extra protection is essential. Minimize outdoor activities midday. Use SPF 50+ sunscreen, UV-protective clothing, a hat, and sunglasses.",
  },
  {
    category: "Extreme",
    range: [11, 12, 13],
    recommendation:
      "Avoid sun exposure if possible during peak hours. If outdoors, take maximum precautions: use SPF 50+ sunscreen, wear full-coverage clothing, and seek shade constantly.",
  },
];
