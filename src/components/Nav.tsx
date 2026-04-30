import { routes } from "@/routes";

import LinkComponent from "@/components/ui/LinkComponent";

export default function Nav() {
  return (
    <nav className='border-b'>
      <ul className='ml-auto flex justify-end -mx-1'>
        {routes.map(({ name, path }, index) => {
          return (
            <li key={name + path + index} className='px-1'>
              <LinkComponent
                key={name + index}
                name={name}
                url={path}
                activeLinkStyle='bg-black text-white'
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
