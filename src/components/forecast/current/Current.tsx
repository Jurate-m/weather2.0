"use client";

import { useState } from "react";
import { HourlyData } from "@/utils/interfaces";
import MainDisplay from "./MainDisplay";
import TabsContainer from "./TabsContainer";

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

      <TabsContainer
        data={slicedData}
        units={units}
        onSelect={handleClick}
        index={index}
      />
    </div>
  );
}
