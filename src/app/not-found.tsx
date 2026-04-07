import Button from "@/components/ui/Button";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist.",
};

const ERROR_CODE = String(404);

export default function NotFound() {
  return (
    <>
      <header className='py-4 flex flex-col'>
        <Nav />
      </header>
      <section className='py-20 text-center'>
        <h1
          className='flex justify-center items-center text-8xl pb-5 font-bold bg-black [-webkit-text-fill-color:white] [background-clip:text] 
    [-webkit-text-stroke-width:2px] text-transparent'
        >
          {[...ERROR_CODE].map((letter) =>
            letter === "0" ? (
              <span className='block relative text-white'>
                {letter}
                <Icon
                  iconId={2}
                  aria-hidden='true'
                  className='absolute w-24 h-24 top-[50%] left-[50%] -translate-[50%]'
                />
              </span>
            ) : (
              letter
            ),
          )}
        </h1>
        <h2 className='text-5xl font-semibold pb-4'>Page not found</h2>
        <p className='pb-6'>The page You are looking for does not exist.</p>
        <Button href='/' title='Return Home' />
      </section>
    </>
  );
}
