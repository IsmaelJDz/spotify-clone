"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import qs from "query-string";
import { useEffect } from "react";
import Input from "./Input";

interface SearchInputProps {
  className?: string;
}

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder='What do you want to listen to?'
      onChange={({ target }) => setValue(target.value)}
      value={value}
    />
  );
};

export default SearchInput;
