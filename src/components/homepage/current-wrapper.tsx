import { fetchHourlyWeather } from "@/_lib/data";
import Error from "@/components/ui/Error";
import CurrentDetails from "./current-details";
import UvIndex from "./uv-index";
import Astro from "./astro";
import Tabs from "./tabs";

type LocationType = {
  location: {
    place: {
      name: string;
      country: string;
    };
    id: null | string;
    error: null | string;
  };
};

export default async function CurrentWrapper({ location }: LocationType) {
  let forecast = null;
  let error = null;

  const { place, id } = location;

  if (id) {
    try {
      forecast = await fetchHourlyWeather(id);
    } catch (err) {
      console.log(err);
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
    <div className='max-w-full w-5xl mx-auto px-4 py-4 grid gap-4'>
      <div className='grid md:grid-cols-12 gap-4'>
        <CurrentDetails
          location={place}
          units={units}
          data={current}
          className='md:col-span-7 shadow-md shadow-shdw/10'
        ></CurrentDetails>
        <div className='md:col-span-5 flex flex-col gap-4'>
          <UvIndex pos={uvIndex} />
          {id && <Astro placeId={id} />}
        </div>
      </div>
      <Tabs data={hourly} units={units} />
    </div>
  );
}
