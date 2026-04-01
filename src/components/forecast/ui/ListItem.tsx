import List from "./List";
import { ForecastValue } from "@/utils/interfaces";

export default function ListItem({ data }: { data: [string, ForecastValue] }) {
  return (
    <li className='grid grid-cols-[max-content_max-content] justify-between gap-2 border p-2 xs:p-4 rounded-xl'>
      {data.map((item, index) => {
        if (typeof item === "object") {
          return <List data={item} className='col-span-full' />;
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
