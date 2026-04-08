"use client";

import { useState } from "react";
import { HourlyData } from "@/utils/interfaces";
import MainDisplay from "./MainDisplay";
import TabsContainer from "./TabsContainer";
import LinkComponent from "@/components/ui/LinkComponent";

export default function Current({ data }: { data: HourlyData | null }) {
  const [index, setIndex] = useState(0);

  if (!data) return;

  const units = data.units;

  const slicedData = data.hourly.data.slice(0, 6);

  const handleClick = (id: number) => {
    setIndex(id);
  };

  return (
    <div>
      <MainDisplay data={data.hourly.data} units={units} index={index} />
      <div className='flex flex-col-reverse'>
        <TabsContainer
          data={slicedData}
          units={units}
          onSelect={handleClick}
          index={index}
        />
        <LinkComponent
          name='Hourly Forecast'
          url='/hourly'
          className='inline-block ml-auto font-bold border border-amber-400 py-2 px-4 mb-10 bg-yellow-400  hover:text-black hover:bg-amber-400 '
        />
      </div>
    </div>
  );
}
