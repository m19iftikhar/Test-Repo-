"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import dotIcon from "@/public/assets/svgs/dots-vertical.svg";

import style from "./ActionsDropdown.module.scss";

const ActionsDropdown = ({
  rowData,
  actionItems,
  modifier,
  itemModifier,
  ...props
}: any) => {
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsDropdownExpanded((prev) => !prev);
  }, []);

  const handleActionClick = useCallback(
    (onClick?: (data: any) => void) => {
      onClick?.(rowData);
      setIsDropdownExpanded(false);
    },
    [rowData]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownExpanded(false);
      }
    };

    if (isDropdownExpanded) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownExpanded]);

  return (
    <div
      ref={dropdownRef}
      className={`table_actions_dropdown ${style.actionsDropdown} ${
        modifier || ""
      }`}
    >
      <button
        className={style.dotsBtn}
        type="button"
        onClick={() => toggleDropdown()}
      >
        <Image src={dotIcon} width={24} height={24} alt="icon" />
      </button>
      {isDropdownExpanded && (
        <ul className={`${style.dropdown} ${props.customClass || ""}`}>
          {actionItems?.map((item: any, i: number) => {
            return (
              <li key={i}>
                {item.hasAction ? (
                  <button
                    onClick={() => {
                      handleActionClick(item.onClick);
                    }}
                    className={`${style.item} ${
                      item.isDisabled ? style.isDisabled : ""
                    } ${itemModifier || ""}`}
                  >
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={24}
                        height={24}
                        className={style.icon}
                      />
                    )}
                    {item.label}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className={`${style.item} ${itemModifier || ""}`}
                  >
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={24}
                        height={24}
                        className={style.icon}
                      />
                    )}
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ActionsDropdown;
