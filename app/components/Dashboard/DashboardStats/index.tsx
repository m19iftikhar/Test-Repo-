"use client";

import SvgComp from "../../General/SvgComp";
import style from "./index.module.scss";
import statsUp from "../../../../public/assets/svgs/stats-up.svg";
import statsDown from "../../../../public/assets/svgs/stats-down.svg";
import Image from "next/image";
import { useDashboardStatsListingQuery } from "@/app/redux/reducers/Dashboard/DashboardApiSlice";
import Spinner from "../../Spinner";

const getIcon = (key: any) => {
  const icons: any = {
    "Active Companies": "/assets/svgs/briefcase.svg",
    Members: "/assets/svgs/members.svg",
    "Booking Today": "/assets/svgs/calender-black.svg",
    "Unpaid Invoices": "/assets/svgs/invoice-black.svg",
    "Pending Tickets": "/assets/svgs/sidebarIcons/ticket-icon.svg",
  };
  return icons[key];
};

const DashboardStats = () => {
  const { data: statsListing, isLoading: loading } =
    useDashboardStatsListingQuery();

  return (
    <>
      {!loading ? (
        <div className={style.main__wrapper}>
          {statsListing?.data &&
            statsListing?.data.length > 0 &&
            statsListing?.data?.map((item: any, index: number) => {
              return (
                <div key={index} className={style.card}>
                  <div className={style.icon}>
                    <Image
                      src={getIcon(item?.title) || "/assets/svgs/briefcase.svg"}
                      alt="icon"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className={style.content}>
                    <h3 className="m-0">
                      {" "}
                      {item.title === "Unpaid Invoices" ? "AED " : ""}
                      {item.count}
                    </h3>
                    <p className="p sm-font m-0">{item.title}</p>
                    <div className={style.stats}>
                      <p className="p sm-font secondary-col m-0">
                        {item.description}
                      </p>
                      <SvgComp
                        src={item.percent < 0 ? statsDown.src : statsUp.src}
                      />
                      <p className="p sm-font secondary-col m-0">
                        {item.percent < 0 ? "" : "+"}
                        {item.percent}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="mb-70">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default DashboardStats;
