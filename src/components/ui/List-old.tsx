import ListItem from "./ListItem";
import { ForecastValue } from "@/utils/interfaces";

export default function List({
  data,
  className,
}: {
  data: Record<string, ForecastValue> | Record<string, string | number> | null;
  className?: string;
}) {
  return (
    <ul className={className}>
      {data &&
        Object.entries(data).map((item, index) => {
          return <ListItem key={index} data={item} />;
        })}
    </ul>
  );
}
