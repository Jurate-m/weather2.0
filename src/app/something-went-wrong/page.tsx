import { headers } from "next/headers";
import { Suspense } from "react";
import Link from "next/link";

const ERROR_MESSAGE = {
  ip: "You have made too many requests.",
};

async function SomethingWentWrong() {
  const respHeaders = await headers();
  const reason = respHeaders?.get("x-rate-limit-reason");
  const time = respHeaders.get("retry-after");

  console.log(time);

  const message = reason
    ? ERROR_MESSAGE[reason as keyof typeof ERROR_MESSAGE]
    : "Something went wrong - Please come back later";

  return (
    <main className='max-w-full w-xl mx-auto px-4 py-20 text-center'>
      <h1 className='text-6xl font-bold pb-5'>Oh no!</h1>
      <p>{message}</p>
      <p className='pb-6'>Try again in {time} seconds</p>
      <Link
        href='/'
        className='inline-block py-2 px-5 text-font-primary hover:text-(--primary) font-semibold rounded-full border-2 border-accent hover:bg-accent transition-all duration-50 ease-in shadow-md shadow-shdw'
      >
        Return Home
      </Link>
    </main>
  );
}

export default async function Page({}) {
  return (
    <Suspense>
      <SomethingWentWrong />
    </Suspense>
  );
}
