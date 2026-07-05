import { Suspense } from "react";
import Icon from "./ui/Icon";
import Nav from "./Nav";
import SearchForm from "./search/search-form";
import SearchResults from "./search/search-results";
import SearchButton from "@/components/search/search-button";
import SearchModal from "@/components/search/search-modal";

import SearchProvider from "@/components/search/search-provider";

export default function Header() {
  return (
    <header className='max-w-full w-5xl mx-auto md:px-5 sticky top-0 md:static z-20'>
      <div className='py-2.5 px-5 flex justify-between gap-2 md:gap-4 bg-primary md:shadow-md shadow-shdw md:rounded-full border border-border'>
        <div className='flex gap-4 items-center'>
          <Icon iconId={2} className='w-10' />
          <Suspense>
            <Nav />
          </Suspense>
        </div>
        <div>
          <SearchProvider>
            <SearchButton />
            <SearchModal>
              <div className='relative'>
                <Suspense>
                  <SearchForm />
                </Suspense>
                <Suspense>
                  <SearchResults />
                </Suspense>
              </div>
            </SearchModal>
          </SearchProvider>
        </div>
      </div>
    </header>
  );
}
