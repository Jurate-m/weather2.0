import { Suspense } from "react";
import {
  validateParam,
  MIN_LENGTH,
  Q_MAX_LENGTH,
  Q_REGEX,
} from "@/lib/validate";
import Nav from "./Nav";
import SearchOuter from "./search/SearchOuter";
import SearchBar from "./search/SearchBar";
import SearchWrapper from "./search/SearchWrapper";

export default async function Header({
  searchParams,
  slug,
}: {
  searchParams: Promise<{ q?: string }>;
  slug?: string;
}) {
  const { q } = await searchParams;

  const validateQ = q
    ? validateParam(q.toString(), Q_REGEX, MIN_LENGTH, Q_MAX_LENGTH)
    : "";

  const validQ = validateQ && validateQ.sanitized ? validateQ.sanitized : "";

  return (
    <header className='relative py-4 flex flex-col z-10'>
      <Nav />
      <SearchWrapper>
        <Suspense>
          <SearchBar key={slug ? slug : "home"} />
        </Suspense>
        <SearchOuter q={validQ} />
      </SearchWrapper>
    </header>
  );
}
