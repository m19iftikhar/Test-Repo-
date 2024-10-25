"use client";
import Image from "next/image";
import style from "./sidebar.module.scss";
import Link from "next/link";
import sidebarData from "../../../json/sidebar.json";
import {useEffect, useState} from "react";
import {usePathname, useSelectedLayoutSegments} from "next/navigation";

const Sidebar = () => {
  const pathName: any = usePathname();
  const segment: any = useSelectedLayoutSegments();

  const [sidelayoutShow, setSidelayoutShow] = useState(false);
  const [sidebarShow, setSidebarShow] = useState(false);
  const [sidelayoutData, setSidelayoutData] = useState<any>(null);

  const handleSidelayoutShow = (resp: any) => {
    setSidelayoutShow(true);
    setSidelayoutData(resp);
  };
  const handleSidelayoutHide = () => {
    setSidelayoutShow(false);
  };

  // set submenu item on page reload in side layoyt
  useEffect(() => {
    let subMenuItems;
    sidebarData.listItems.forEach((item: any) => {
      if (segment.includes(item.slug)) {
        subMenuItems = item;
      }
    });

    setSidelayoutData(subMenuItems);
    setSidelayoutShow(() => {
      return segment.length > 1;
    });
  }, []);

  return (
    <>
      <div
        className={`${style.sidebarWrapper} ${sidebarShow ? style.show : ""}`}>
        <div className={style.sidebar}>
          <div
            className={`${style.frontLayout} ${
              sidelayoutShow ? style.hideHalf : ""
            }`}>
            <div className={style.logoWrapper}>
              <Link className={style.logoText} href={"/dashboard"}>
                <Image
                  src={sidebarData.brandlogoText}
                  width={106}
                  height={36}
                  alt="brand-logo"
                  priority
                />
              </Link>
              <Link className={style.logoIcon} href={"/dashboard"}>
                <Image
                  src={sidebarData.brandlogoIcon}
                  width={46}
                  height={46}
                  alt="brand-logo"
                  priority
                />
              </Link>
            </div>
            <ul className={style.menu}>
              {sidebarData.listItems.map((listItem: any, i: number) => {
                return (
                  <>
                    <li className={style.menuItem} key={i}>
                      {listItem.link && (
                        <Link
                          onClick={() => setSidebarShow(false)}
                          href={listItem.link}
                          className={`${style.menuLink} ${
                            pathName == listItem.link ? style.active : ""
                          }`}>
                          <div
                            className={`${style.icon} ${
                              listItem.size ? style[listItem.size] : ""
                            }`}>
                            <Image
                              src={listItem.icon}
                              width={22}
                              height={22}
                              alt={listItem.title}
                            />
                          </div>
                          <div className={style.titleWrapper}>
                            <h4 className={style.title}>{listItem.title}</h4>
                          </div>
                        </Link>
                      )}
                      {listItem.submenu && (
                        <button
                          type="button"
                          className={`${style.menuLink} ${
                            segment.includes(listItem.slug) ? style.active : ""
                          }`}
                          onClick={() => handleSidelayoutShow(listItem)}>
                          <div className={style.icon}>
                            <Image
                              src={listItem.icon}
                              width={158}
                              height={46}
                              alt={listItem.title}
                            />
                          </div>
                          <div className={style.titleWrapper}>
                            <h4 className={style.title}>{listItem.title}</h4>
                            <div className={style.arrow}>
                              <Image
                                src={"/assets/svgs/dropdown-arrow.svg"}
                                width={7}
                                height={10}
                                alt={"arrow"}
                              />
                            </div>
                          </div>
                        </button>
                      )}
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
          <div
            className={`${style.sideLayout} ${
              sidelayoutShow ? style.show : ""
            }`}>
            <Link className={style.logoWrapper} href={"/dashboard"}>
              <Image
                src={sidebarData.brandlogoText}
                width={46}
                height={46}
                alt="brand-logo"
              />
            </Link>
            <div className={style.menuTitle}>
              <button
                type="button"
                className={style.arrow}
                onClick={() => handleSidelayoutHide()}>
                <Image
                  src={"/assets/svgs/back-arrow.svg"}
                  width={16}
                  height={10}
                  alt="arrow"
                />
              </button>
              <h4 className={style.title}>{sidelayoutData?.title}</h4>
            </div>
            <ul className={style.subMenu}>
              {sidelayoutData?.submenu.map((item: any, i: number) => {
                return (
                  <li
                    className={`${style.subMenu__item} ${
                      "/" + segment.join("/") === item.link ||
                      pathName.split("/").includes(item.slug)
                        ? style.active
                        : ""
                    }`}
                    key={i}>
                    <Link
                      onClick={() => setSidebarShow(false)}
                      href={item.link}>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            type="button"
            className={`${style.toggleBtn} ${sidebarShow ? style.show : ""}`}
            onClick={() => setSidebarShow(!sidebarShow)}>
            <div className={style.arrow}>
              <Image
                src={"/assets/svgs/dropdown-arrow.svg"}
                width={7}
                height={10}
                alt={"arrow"}
              />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
