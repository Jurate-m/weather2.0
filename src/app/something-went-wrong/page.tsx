import { headers } from "next/headers";
import { Suspense } from "react";
import Button from "@/components/ui/Button";

const ERROR_MESSAGE = {
  ip: "You have made too many requests. Please wait a moment before searching again.",
};

async function SomethingWentWrong() {
  const reason = (await headers())?.get("x-rate-limit-reason");

  const message = reason
    ? ERROR_MESSAGE[reason as keyof typeof ERROR_MESSAGE]
    : "Something went wrong - Please come back later";

  return (
    <section className='h-screen flex flex-col items-center justify-center'>
      <h1 className='text-8xl font-bold pb-5'>Oh no!</h1>
      <p className='text-2xl font-semibold text-center pb-6'>{message}</p>
      <Button href='/' title='Return Home' />
    </section>
  );
}

export default async function Page({}) {
  return (
    <Suspense>
      <SomethingWentWrong />
    </Suspense>
  );
}
