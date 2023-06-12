"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import usePlayer from "@/hooks/usePlayer";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";

interface ISidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<ISidebarProps> = ({ children, songs }) => {
  const pathName = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathName !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathName === "/search",
        href: "/search",
      },
    ],
    [pathName]
  );

  return (
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && "h-[calc(100%-80px)]"
      )}>
      <div
        className='
        hidden
        md:flex
        flex-col
        gap-y-2
        bg-black
        h-full
        w-[300px]
        p-2
      '>
        <Box>
          <div className='flex flex-col px-5 py-4 gap-y-4'>
            {routes.map(route => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>
        <Box className='h-full overflow-y-auto'>
          <Library songs={songs} />
        </Box>
      </div>
      <main className='flex-1 h-full py-2 overflow-y-auto'>{children}</main>
    </div>
  );
};

export default Sidebar;
