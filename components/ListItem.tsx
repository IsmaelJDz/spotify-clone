"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface IListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<IListItemProps> = ({
  image,
  name,
  href,
}) => {
  const router = useRouter();

  const onClick = () => {
    // add auth before push
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className='relative flex items-center pr-4 overflow-hidden transition rounded-md group gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20'>
      <div className='relative min-h-[64px] min-w-[64px]'>
        <Image
          className='object-cover'
          fill
          src={image}
          alt='Liked'
        />
      </div>
      <p className='py-5 font-medium truncate'>{name}</p>
      <div className='absolute flex items-center justify-center p-4 transition bg-green-500 rounded-full opacity-0 drop-shadow-sm right-5 group-hover:opacity-100 hover:scale-110'>
        <FaPlay className='text-black' />
      </div>
    </button>
  );
};

export default ListItem;
