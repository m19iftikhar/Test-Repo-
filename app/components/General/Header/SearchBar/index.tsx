"use client";

import Image from "next/image";
import style from "./index.module.scss";
import {useState} from "react";

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className={style.search__wrraper}>
      <div
        className={`${style.input__wrapper} ${showSearch ? style.show : ""}`}>
        <input className={style.search} type="text" placeholder="Search" />
        <button className={style.search__icon}>
          <Image
            src={"/assets/svgs/search.svg"}
            alt="search"
            width={20}
            height={20}
          />
        </button>
      </div>

      <button
        onClick={() => setShowSearch(!showSearch)}
        className={style.search__icon__btn}>
        <Image
          src={"/assets/svgs/search.svg"}
          alt="search"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default SearchBar;
