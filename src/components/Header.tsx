import { Suspense } from "react";
import Icon from "./ui/Icon";
import Nav from "./Nav";
import SearchForm from "./search/search-form";
import SearchResults from "./search/search-results";
import SearchButton from "@/components/search/search-button";
import SearchModal from "@/components/search/search-modal";

export default function Header() {
  return (
    <header className='max-w-5xl mx-auto md:px-5 relative'>
      <div className='py-2.5 px-5 flex justify-between gap-4 md:rounded-full bg-primary shadow-md shadow-shdw/10 border border-font-1/10'>
        <div className='flex gap-4 items-center'>
          <Icon iconId={2} className='w-10' aspectRatio='aspect-square' />
          <Suspense>
            <Nav />
          </Suspense>
        </div>
        <div>
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
        </div>
      </div>
    </header>
  );
}
