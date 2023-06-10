import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import React from "react";
import SearchContent from "./SearchContent";

interface PageSearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const PageSearch = async ({ searchParams }: PageSearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className='w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900'>
      <Header className='from-bg-neutral-900'>
        <div className='flex flex-col mb-2 gap-y-6'>
          <h1 className='text-3xl font-semibold text-white'>Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default PageSearch;
