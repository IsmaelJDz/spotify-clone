"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";

interface MediaItemProps {
  song: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ song, onClick }) => {
  const imageUrl = useLoadImage(song);

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }

    //TODO: Default turn on player
  };

  return (
    <div
      className='flex items-center w-full p-2 rounded-md cursor-pointer gap-x-3 hover:bg-neutral-800/50'
      onClick={handleClick}>
      <div className='relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden'>
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          alt='Media item'
          className='object-cover'
        />
      </div>
      <div className='flex flex-col overflow-hidden gap-y-1'>
        <p className='text-white truncate'>{song.title}</p>
        <p className='text-sm truncate text-neutral-400'>{song.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
