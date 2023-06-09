"use client";

import React from "react";
import { Song } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import { data } from "autoprefixer";
import PlayButton from "./PlayButton";

interface SongItemProps {
  song: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ song, onClick }) => {
  const imagePath = useLoadImage(song);

  return (
    <div
      onClick={() => onClick(song.id)}
      className='relative flex flex-col items-center justify-center p-3 overflow-hidden transition rounded-md cursor-pointer group gap-x-4 bg-neutral-400/5 hover:bg-neutral-400/10'>
      <div className='relative w-full h-full overflow-hidden rounded-md aspect-square'>
        <Image
          className='object-cover'
          src={imagePath || "/images/liked.png"}
          fill
          alt='Image'
        />
      </div>
      <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
        <p className='w-full font-semibold truncate'>{song.title}</p>
        <p className='w-full pb-4 text-sm text-neutral-400'>By {song.author}</p>
      </div>
      <div className='absolute bottom-24 right-5'>
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
