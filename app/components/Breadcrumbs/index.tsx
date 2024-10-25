"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import style from "./Breadcrumbs.module.scss";
import SvgComp from "../General/SvgComp";

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);

  const formatBreadcrumb = (text: string) => {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (pathname === "/dashboard") {
    return (
      <h2 className="m-0 text-capitalize">
        {pathname.split("/").at(-1)?.replace("-", " ")}
      </h2>
    );
  }

  return (
    <>
      <h2 className="m-0 text-capitalize">
        {pathname.split("/").at(-1)?.replace("-", " ")}
      </h2>
      <nav>
        <ol className={style.breadcrumb}>
          <li className={style.breadcrumbItem}>
            <Link href="/dashboard" className={style.homeIcon}>
              <SvgComp src="/assets/svgs/home-icon.svg" />{" "}
              <span className={style.separator}>/</span>
            </Link>
          </li>
          {pathArray.map((path, index) => {
            const href = "/" + pathArray.slice(0, index + 1).join("/");
            const isLast = index === pathArray.length - 1;

            return (
              <li key={index} className={`${style.breadcrumbItem}`}>
                {isLast ? (
                  <div
                    className={`${style.breadcrumbItem}  ${
                      isLast ? style.active : ""
                    }`}
                  >
                    {formatBreadcrumb(path)}
                  </div>
                ) : (
                  <>
                    <Link href={href}>
                      {path.charAt(0).toUpperCase() + path.slice(1)}
                    </Link>{" "}
                    <span className={style.separator}>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
