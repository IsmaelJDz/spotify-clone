"use client";

import SongItem from "@/components/SongItem";
import { Song } from "@/types";
import React from "react";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <h1 className='text-2xl font-semibold text-neutral-400'>
          No songs found
        </h1>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8'>
      {songs.map(song => (
        <SongItem key={song.id} onClick={() => {}} song={song} />
      ))}
    </div>
  );
};

export default PageContent;
