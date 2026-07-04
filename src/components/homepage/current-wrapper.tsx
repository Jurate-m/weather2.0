import { fetchHourlyWeather } from "@/_lib/data";
import Error from "@/components/ui/Error";
import CurrentDetails from "./current-details";
import UvIndex from "./uv-index";
import Astro from "./astro";
import Tabs from "./tabs";

type LocationType = {
  location: {
    place_id: string;
    name: string;
    country: string;
  };
};

export default async function CurrentWrapper({ location }: LocationType) {
  let forecast = null;
  let error = null;

  const { place_id, name, country } = location;

  if (place_id) {
    try {
      forecast = await fetchHourlyWeather(place_id);
    } catch (err) {
      error = (err as Error).message;
    }
  }

  if (error) {
    return (
      <Error>
        <p className='text-2xl font-semibold pb-2'>
          Couldn't retrieve foreacast data.
        </p>
        <p className=''>Please use search form and try again.</p>
      </Error>
    );
  }

  const units = forecast.units;

  const current = forecast.hourly.data[0];
  const uvIndex = +current.uv_index;

  const hourly = forecast.hourly.data.slice(1, 6);

  return (
    <div className='grid gap-4'>
      <div className='grid md:grid-cols-12 gap-4'>
        <CurrentDetails
          location={{ name, country }}
          units={units}
          data={current}
          className='md:col-span-7 shadow-md shadow-shdw'
        ></CurrentDetails>
        <div className='md:col-span-5 flex flex-col gap-4'>
          <UvIndex pos={uvIndex} />
          {place_id && <Astro placeId={place_id} />}
        </div>
      </div>
      <Tabs data={hourly} units={units} />
    </div>
  );
}
