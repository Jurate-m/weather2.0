import { routes } from "@/routes";
import NavLink from "./NavLink";
import { Suspense } from "react";

export default function Nav() {
  return (
    <nav className='border-b pt-2'>
      <ul className='ml-auto flex justify-end -mx-1'>
        {routes.map(({ name, path }) => {
          return <NavLink key={name} name={name} url={path} />;
        })}
      </ul>
    </nav>
  );
}
