import { getForecast } from "@/_lib/forecast";
import Pagination from "../ui/Pagination";
import Accordion from "../ui/accordion";
import AccordionContent from "./accordionContent";
import AccordionLabel from "./accordionLabel";

type ForecastListingType = {
  name: string;
  country: string;
  location_id: string;
  param: "daily" | "hourly";
  page: number;
};

export default async function ForecastListing({
  name,
  country,
  location_id,
  param,
  page,
}: ForecastListingType) {
  const {
    data,
    entryDateKey,
    units,
    currentPage,
    totalPages,
    pagination,
    length,
  } = await getForecast(param, location_id, page);

  const slug = param.slice(0, 1).toUpperCase() + param.slice(1, param.length);
  const title = `${slug} forecast`;
  const subtitle = `Next ${length} ${param === "daily" ? "days" : "hours"} for ${name}, ${country}`;

  return (
    <>
      <div className='py-6'>
        <h1 className='text-4xl font-semibold pb-2'>{title}</h1>
        <p className='text-sm font-light'>{subtitle}</p>
      </div>
      <div className='rounded-xl border border-border overflow-hidden'>
        <div>
          {data.map((item: any, i: number) => {
            return (
              <Accordion
                key={item.date}
                label={
                  <AccordionLabel
                    data={item}
                    dateKey={entryDateKey}
                    param={param}
                    units={units}
                  />
                }
                active={i === 0}
                contentId={item.date}
                content={
                  <AccordionContent data={item} units={units} param={param} />
                }
                className='border-b border-border last:border-b-0 [&>button]:hover:bg-secondary [&_.chevron]:transition-transform [&_.chevron]:duration-75 [&_.chevron]:ease-in'
                activeStyles='[&_.chevron]:rotate-90'
              />
            );
          })}
        </div>
      </div>
      <Pagination
        title={pagination}
        page={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
