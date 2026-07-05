import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist.",
};

const ERROR_CODE = String(404);

export default function NotFound() {
  return (
    <>
      <section className='max-w-full w-xl mx-auto px-4 py-20 text-center'>
        <h1 className='pb-5 font-bold text-font-primary text-2xl'>
          Error
          <span className='flex justify-center items-center text-8xl bg-font-primary py-2 bg-clip-text'>
            {[...ERROR_CODE].map((letter) =>
              letter === "0" ? (
                <span className='block relative text-transparent'>
                  {letter}
                  <Icon
                    iconId={2}
                    aria-hidden='true'
                    className='absolute w-24 h-24 top-[50%] left-[50%] -translate-[50%]'
                  />
                </span>
              ) : (
                <span
                  className='[-webkit-text-fill-color:white] dark:[-webkit-text-fill-color:var(--color-primary)]
    [-webkit-text-stroke-width:4px] text-transparent leading-none'
                >
                  {letter}
                </span>
              ),
            )}
          </span>
        </h1>
        <p className='pb-6'>
          We looked everywhere, but this page has drifted off. <br />
          It may have been moved, renamed, or never existed at all.
        </p>
        <Link
          href='/'
          className='py-2 px-5 text-font-primary font-semibold rounded-full border-2 border-accent hover:bg-accent transition-all duration-50 ease-in shadow-md shadow-shdw'
        >
          Back to today's forecast
        </Link>
      </section>
    </>
  );
}
