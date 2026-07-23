"use client";

import { useState } from "react";
import { time, getUnits } from "@/utils/functions";

import TabsContent from "./tabs-content";
import Carousel from "../ui/carousel";
import Card from "../ui/card";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

type TabsType = {
  data: any;
  units: string;
};

export default function Tabs({ data, units }: TabsType) {
  const [active, setActive] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent, index: number) => {
    setActive(index);
  };

  const TabContent = (item: any) => {
    const { icon, date, temperature } = item;
    const hour = time(date);
    return (
      <div>
        <p className='text-sm'>{hour}</p>
        <Icon iconId={icon} className='w-12 max-w-full mx-auto py-4' />
        <p className='font-semibold'>
          {Math.round(temperature)} {getUnits(units, "temperature")}
        </p>
      </div>
    );
  };

  return (
    <Card className='bg-primary overflow-hidden shadow-md shadow-shdw'>
      <h2 className='font-semibold text-lg pb-4'>Next {data.length} hours</h2>
      <Carousel className='mb-4'>
        <ul className='flex py-1' role='tablist' aria-label='Hourly forecast'>
          {data.map((item: any, index: number) => {
            return (
              <li key={item.date} className='min-w-18 w-full' role='tab'>
                <Button
                  onClick={(e) => handleClick(e, index)}
                  label={TabContent(item)}
                  className={[
                    active === index
                      ? " border-accent! bg-elevated hover:bg-elevated"
                      : undefined,
                    "px-2 py-2 rounded-xl border-2 border-transparent w-full hover:-translate-y-1 hover:bg-secondary transition-all duration-100 ease-in",
                  ].join(" ")}
                />
              </li>
            );
          })}
        </ul>
      </Carousel>

      {active != null && (
        <TabsContent data={data} units={units} index={active} />
      )}
    </Card>
  );
}
