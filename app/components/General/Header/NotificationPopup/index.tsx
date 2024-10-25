"use client";

import Image from "next/image";
import style from "./index.module.scss";
import { useState, useEffect, useRef } from "react";

const NotificationPopup = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const popupRef: any = useRef(null);

  const handleClickOutside = (event: any) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowNotifications(false); // Close the popup if click is outside
    }
  };

  return (
    <>
      <div
        onClick={() => setShowNotifications(true)}
        className={style.notification__btn}
      >
        <Image
          src={"/assets/svgs/bell.svg"}
          alt="search"
          width={24}
          height={24}
        />

        <span className={style.count}>1</span>
      </div>

      {showNotifications && (
        <div onClick={handleClickOutside} className={style.main__wrapper}>
          <div ref={popupRef} className={style.content}>
            <div className={style.header}>
              <h3 className="m-0">Notifications</h3>
              <button
                className={style.closeBtn}
                onClick={() => setShowNotifications(false)}
              >
                <Image
                  src="/assets/svgs/close-gray.svg"
                  width={24}
                  height={24}
                  alt="icon"
                />
              </button>
            </div>

            <div className={style.body}>
              <div className={style.cards__columns}>
                <div className={style.item}>
                  <h6 className={`secondary-col fw-500 ${style.date}`}>
                    Today
                  </h6>
                  <div
                    className={`${style.notification__card} ${style.unRead}`}
                  >
                    <div className={style.icon}>
                      <Image
                        src="/assets/svgs/megaphone.svg"
                        width={24}
                        height={24}
                        alt="icon"
                      />
                    </div>
                    <div className={style.info}>
                      <div className={style.markAsRead__wrapper}>
                        <h6 className="fw-500 secondary-col m-0">
                          Announcement
                        </h6>
                        <button className="secondary-col m-0">
                          Mark as read
                        </button>
                      </div>
                      <h5 className="m-0">
                        Set Business Hours and Workdays for Your Locations
                      </h5>
                      <p className="p sm-font m-0">
                        We&apos;re excited to announce our latest feature:
                        Location-Specific Business Hours
                      </p>
                    </div>
                  </div>

                  <div className={`${style.notification__card}`}>
                    <div className={style.icon}>
                      <Image
                        src="/assets/svgs/user-white.svg"
                        width={24}
                        height={24}
                        alt="icon"
                      />
                    </div>
                    <div className={style.info}>
                      <div className={style.markAsRead__wrapper}>
                        <h6 className="fw-500 secondary-col m-0">
                          Admin Portal
                        </h6>
                      </div>
                      <h5 className="m-0">
                        Manual Bill Run and Enhanced Invoice Transparency
                      </h5>
                      <p className="p sm-font m-0">
                        We hope you’ve had a fantastic week. We’ve got some
                        exciting updates that will elevate your experience with
                        our platform even further.
                      </p>
                    </div>
                  </div>

                  <div className={`${style.notification__card}`}>
                    <div className={style.icon}>
                      <Image
                        src="/assets/svgs/user-white.svg"
                        width={24}
                        height={24}
                        alt="icon"
                      />
                    </div>
                    <div className={style.info}>
                      <div className={style.markAsRead__wrapper}>
                        <h6 className="fw-500 secondary-col m-0">
                          Announcements
                        </h6>
                      </div>
                      <h5 className="m-0">
                        Share Your Product Insights in Our New Feedback Portal
                      </h5>
                      <p className="p sm-font m-0">
                        We&apos;re excited to announce the launch of our new
                        DIFC Feedback Portal. 
                      </p>
                    </div>
                  </div>
                </div>

                <div className={style.item}>
                  <h6 className={`secondary-col fw-500 ${style.date}`}>
                    Yesterday
                  </h6>
                  <div className={`${style.notification__card}`}>
                    <div className={style.icon}>
                      <Image
                        src="/assets/svgs/megaphone.svg"
                        width={24}
                        height={24}
                        alt="icon"
                      />
                    </div>
                    <div className={style.info}>
                      <div className={style.markAsRead__wrapper}>
                        <h6 className="fw-500 secondary-col m-0">
                          Announcement
                        </h6>
                      </div>
                      <h5 className="m-0">
                        New in Data Hub: Enhanced Data Dashboards Now Available!
                      </h5>
                      <p className="p sm-font m-0">
                        We&apos;re excited to announce that we have migrated
                        some of our data dashboards to new and improved
                        versions.
                      </p>
                    </div>
                  </div>

                  <div className={`${style.notification__card}`}>
                    <div className={style.icon}>
                      <Image
                        src="/assets/svgs/invoice-white.svg"
                        width={24}
                        height={24}
                        alt="icon"
                      />
                    </div>
                    <div className={style.info}>
                      <div className={style.markAsRead__wrapper}>
                        <h6 className="fw-500 secondary-col m-0">
                          Payment Due
                        </h6>
                      </div>
                      <h5 className="m-0">#012345 invoice is over due</h5>
                      <p className="p sm-font m-0">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationPopup;
