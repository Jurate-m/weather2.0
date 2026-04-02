import List from "./List";
import { ForecastValue } from "@/utils/interfaces";

export default function ListItem({ data }: { data: [string, ForecastValue] }) {
  return (
    <li className='grid gap-2 grid-cols-[max-content_max-content] justify-between border-b last:border-b-0 xs:nth-last-[-n+2]:border-0 p-2 xs:p-4  '>
      {data.map((item, index) => {
        if (typeof item === "object") {
          return (
            <List
              data={item}
              className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4 col-span-full'
            />
          );
        }

        return (
          <p
            key={index}
            className={` ${index === 0 ? "font-montserrat font-bold" : "text-right"}`}
          >
            {item}
          </p>
        );
      })}
    </li>
  );
}
