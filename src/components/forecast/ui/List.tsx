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
    <ul className={`grid xs:grid-cols-2 gap-4 p-4 ${className}`}>
      {data &&
        Object.entries(data).map((item, index) => {
          return <ListItem key={index} data={item} />;
        })}
    </ul>
  );
}
