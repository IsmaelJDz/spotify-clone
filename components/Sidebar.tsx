"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

interface ISidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<ISidebarProps> = ({ children }) => {
  const pathName = usePathname();

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
    <div className='flex h-full '>
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
          <Library />
        </Box>
      </div>
      <main className='flex-1 h-full py-2 overflow-y-auto'>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
