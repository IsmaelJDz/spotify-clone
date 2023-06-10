"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <h1 className='text-3xl font-bold text-white'>
          You have no liked songs
        </h1>
        <p className='mt-2 text-sm text-gray-400'>
          Like some songs to see them here
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full p-6 gap-y-2'>
      {songs.map(song => (
        <div key={song.id} className='flex items-center w-full gap-x-4'>
          <div className='flex-1'>
            <MediaItem onClick={() => {}} song={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
