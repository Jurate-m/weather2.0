import ListItem from "./ListItem";

export default function List({
  data,
  className,
}: {
  data: any;
  className?: string;
}) {
  return (
    <ul className={`xs:grid grid-cols-2 gap-6 p-4 ${className}`}>
      {data &&
        Object.entries(data).map((item, index) => {
          console.log(item);
          return <ListItem key={index} data={item} />;
        })}
    </ul>
  );
}
