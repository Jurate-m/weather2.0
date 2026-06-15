import { fetchAstro } from "@/_lib/data";
import { time } from "@/utils/functions";
import Card from "../ui/card";
import Icon from "../ui/Icon";

export default async function Astro({ placeId }: { placeId: string }) {
  const astro = await fetchAstro(placeId);

  const data = astro?.astro.data[0];

  const sun = data?.sun;

  return (
    <Card className='shadow-md shadow-shdw/10'>
      {sun && (
        <div className='flex gap-4 items-center'>
          <Icon iconId={2} className='h-20' />
          <div className='grow'>
            <div className='flex gap-2 items-center justify-between'>
              <h2 className='text-lg font-semibold'>Sunrise</h2>
              <p className='text-sm'>
                <time dateTime={sun.rise} className='block'>
                  {time(sun.rise)}
                </time>
              </p>
            </div>
            <span className='block w-full h-0.5 bg-[#C9B78F] rounded-xl'></span>
            <div className='flex gap-2 items-center justify-between'>
              <h2 className='text-lg font-semibold'>Sunset</h2>
              <p className='text-sm'>
                <time dateTime={sun.set}>{time(sun.set)}</time>
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
