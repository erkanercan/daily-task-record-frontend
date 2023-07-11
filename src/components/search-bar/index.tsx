import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./search-bar.module.scss";
import { useSearchStore } from "@/stores/search-store";
import { useQuery } from "@tanstack/react-query";

const SearchBar = () => {
  const { search, setSearch } = useSearchStore();
  const [inputValue, setInputValue] = useState(search);

  const delay = 300;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const { data: searchQuery, isSuccess } = useQuery({
    queryKey: ["search", inputValue],
    queryFn: (): Promise<string> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(inputValue);
        }, delay);
      });
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("searchQuery", searchQuery);
      setSearch(searchQuery);
    }
  }, [searchQuery, setSearch, isSuccess]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search Task"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className={styles.searchIcon}>
        <Image
          src="/icons/search.svg"
          alt="Search Icon"
          width={25}
          height={25}
        />
      </div>
    </div>
  );
};

export default SearchBar;
