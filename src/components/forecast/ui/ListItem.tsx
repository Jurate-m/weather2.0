import List from "./List";

export default function ListItem({ data }) {
  return (
    <li className='grid gap-2 grid-cols-3 border p-2 xs:p-4 rounded-xl'>
      {data.map((item, index) => {
        if (typeof item === "object") {
          return <List data={item} className='col-span-full' />;
        }

        return (
          <p
            key={index}
            className={` ${index === 0 ? "font-montserrat font-bold col-span-2" : "text-right"}`}
          >
            {item}
          </p>
        );
      })}
    </li>
  );
}
