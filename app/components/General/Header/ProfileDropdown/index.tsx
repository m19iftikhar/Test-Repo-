"use client";

import Image from "next/image";
import style from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const ProfileDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropDownRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropdown(false); // Close the popup if click is outside
      }
    };

    // Add event listener when popup is open
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener when popup is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div
      ref={dropDownRef}
      onClick={() => setShowDropdown(!showDropdown)}
      className={style.user__info}
    >
      <div className={style.profile__img}>
        <Image
          src={"/assets/images/dashboard/community-profile.jpg"}
          alt="profile"
          width={50}
          height={50}
          className="img-hack"
        />
      </div>

      <div>
        <div className={style.user__detail}>
          <h4 className="m-0">DIFC</h4>
          <Image
            src={"/assets/svgs/angle-down.svg"}
            alt="icon"
            width={10}
            height={10}
          />
        </div>
        <p className="secondary-col m-0">Admin</p>
      </div>

      <ul
        className={`${style.dropdown__wrapper} ${
          showDropdown ? style.open : ""
        }`}
      >
        <div className={style.arrow}>
          <Image
            src={"/assets/svgs/polygon.svg"}
            alt="polygon"
            width={29}
            height={25}
          />
        </div>
        <li>
          <Link href={"#"}>
            <Image
              src={"/assets/svgs/user.svg"}
              alt="user"
              width={22}
              height={22}
            />

            <h5 className="fw-400 m-0 black-col">Profile</h5>
          </Link>
        </li>

        <li>
          <button onClick={() => signOut({ callbackUrl: "/login" })}>
            <Image
              src={"/assets/svgs/logout.svg"}
              alt="user"
              width={22}
              height={22}
            />

            <h5 className="fw-400 m-0 black-col">Logout</h5>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
