import Image from "next/image";
import styles from "./search-bar.module.scss";

const SearchBar = () => {
  // This component will have a input
  // With one placeholder text and a search icon inside the input, spaced between them
  return (
    <div className={styles.container}>
      <input type="text" placeholder="Search Task" />
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
