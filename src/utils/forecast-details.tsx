import { getUnits } from "@/utils/functions";
import Drop from "@/components/ui/icons/Drop";
import Temp from "@/components/ui/icons/Temp";
import Wind from "@/components/ui/icons/Wind";
import Eye from "@/components/ui/icons/Eye";
import Press from "@/components/ui/icons/Press";

const FIELD_BUILDER = {
  feels_like: (d: any, u: string) => ({
    name: "Feels like",
    val: d.feels_like,
    unit: getUnits(u, "temperature"),
  }),
  wind: (d: any, u: string) => ({
    name: "Wind",
    val: d.wind.speed,
    unit: `${getUnits(u, "speed")} ${d.wind.dir}`,
  }),
  humidity: (d: any, u: string) => ({
    name: "Humidity",
    val: d.humidity,
    unit: getUnits(u, "humidity"),
  }),
  precipitation: (d: any, u: string) => ({
    name: "Precipitation",
    val: d.precipitation.total,
    unit: getUnits(u, "precipitation"),
  }),
  visibility: (d: any, u: string) => ({
    name: "Visibility",
    val: d.visibility,
    unit: getUnits(u, "visibility"),
  }),
  pressure: (d: any, u: string) => ({
    name: "Pressure",
    val: d.pressure,
    unit: getUnits(u, "pressure"),
  }),
  uv_index: (d: any) => ({
    name: "UV Index",
    val: d.uv_index,
    unit: "",
  }),
  temperature_min: (d: any, u: string) => ({
    name: "Temperature min",
    val: d.temperature_min,
    unit: getUnits(u, "temperature"),
  }),
  temperature_max: (d: any, u: string) => ({
    name: "Temperature max",
    val: d.temperature_max,
    unit: getUnits(u, "temperature"),
  }),
};

export const FIELD_ICONS = {
  feels_like: <Temp fill='var(--color-font-primary)' />,
  wind: <Wind fill='var(--color-font-primary)' />,
  humidity: <Drop fill='var(--color-font-primary)' />,
  precipitation: <Drop fill='var(--color-font-primary)' />,
  visibility: <Eye fill='var(--color-font-primary)' />,
  pressure: <Press fill='var(--color-font-primary)' />,
};

type forecastFieldType = keyof typeof FIELD_BUILDER;

export function forecastDetails(
  fields: forecastFieldType[],
  data: any,
  units: string,
) {
  return fields
    .map((key) => ({ key, ...FIELD_BUILDER[key](data, units) }))
    .filter((detail) => detail.val !== null && detail.val !== undefined);
}
