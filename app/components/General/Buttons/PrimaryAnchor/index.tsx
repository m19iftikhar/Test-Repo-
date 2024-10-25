import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";

import dotsIcon from "../../../../../public/assets/svgs/dots-vertical.svg";
import addIcon from "../../../../../public/assets/svgs/black-plus.svg";
import reloadIcon from "../../../../../public/assets/svgs/reload.svg";
import bankBlackIcon from "../../../../../public/assets/svgs/bank-black.svg";
import payOnlineBlackIcon from "../../../../../public/assets/svgs/pay-online-black.svg";
import posBlackIcon from "../../../../../public/assets/svgs/pos-black.svg";
import cashBlackIcon from "../../../../../public/assets/svgs/cash-black.svg";
import closeRedIcon from "../../../../../public/assets/svgs/close-red.svg";
import closeGrayIcon from "../../../../../public/assets/svgs/close-gray.svg";
import refreshIcon from "../../../../../public/assets/svgs/refresh.svg";

import style from "./index.module.scss";
import Spinner from "@/app/components/Spinner";

type props = {
  title: string;
  icon?: "add" | "reload" | string;
  modifier?: string;
  variant?: string;
  iconReversed?: boolean;
  iconSize?: string;
  size?: string;
  customClass?: string;
  isLoading?: boolean;
  disabled?: boolean;
  spinnerClass?: string;
} & (btnProps | linkProps);

type btnProps = {
  type: "button" | "submit";
  func?: any;
};

type linkProps = {
  type: "link";
  href: string;
};

const PrimaryAnchor = (props: props) => {
  const getIcon = useCallback((key: string) => {
    const icons: any = {
      add: addIcon,
      reload: reloadIcon,
      "dots-icon": dotsIcon,
      "pos-black": posBlackIcon,
      "cash-black": cashBlackIcon,
      "pay-online-black": payOnlineBlackIcon,
      "bank-transfer-black": bankBlackIcon,
      "close-red": closeRedIcon,
      "close-gray": closeGrayIcon,
      refresh: refreshIcon,
    };
    return icons[key] || addIcon;
  }, []);

  return (
    <>
      {props.type === "button" || props.type === "submit" ? (
        <button
          type={props.type}
          onClick={props.func}
          className={`${style.theme__btn} ${
            props.modifier ? style[props.modifier] : ""
          } ${props.iconReversed ? style.icon__reverse : ""} ${
            props.variant ? style[props.variant] : ""
          } ${props.size ? style[props.size] : ""} ${props.customClass || ""} ${
            props.isLoading || props.disabled ? style.btn__disabled : ""
          }`}
        >
          {props.isLoading ? (
            <Spinner className={`${style.spinner} ${props.spinnerClass}`} />
          ) : (
            <span>{props.title}</span>
          )}
          {props.icon && (
            <Image
              className={`${style.icon} ${
                props.icon === "add" ? style.add : ""
              } ${props.iconSize ? style[props.iconSize] : ""}`}
              src={getIcon(props.icon)}
              alt="icon"
              width={20}
              height={20}
            />
          )}
        </button>
      ) : props.type === "link" ? (
        <Link
          href={props.href}
          className={`${style.theme__btn} ${
            props.iconReversed ? style.icon__reverse : ""
          } ${props.variant ? style[props.variant] : ""} ${
            props.size ? style[props.size] : ""
          } ${props.customClass || ""}`}
        >
          <span>{props.title}</span>
          {props.icon && (
            <Image
              className={`${style.icon} ${
                props.icon === "add" ? style.add : ""
              } ${props.iconSize ? style[props.iconSize] : ""}`}
              src={getIcon(props.icon)}
              alt="icon"
              width={20}
              height={20}
            />
          )}
        </Link>
      ) : (
        ""
      )}
    </>
  );
};

export default PrimaryAnchor;
