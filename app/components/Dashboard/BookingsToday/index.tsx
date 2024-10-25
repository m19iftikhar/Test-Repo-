"use client";

import Image from "next/image";
import WrapperFrame from "../../General/WrapperFrame";
import style from "./index.module.scss";
import { useDashboardBookingTodayQuery } from "@/app/redux/reducers/Dashboard/DashboardApiSlice";
import Spinner from "../../Spinner";
import Placeholder from "../../Placeholder";

const BookingsToday = () => {
  const { data: bookings, isLoading: loading } =
    useDashboardBookingTodayQuery();

  return (
    <WrapperFrame
      title="Bookings Today"
      noBg={true}
      hidePX={true}
      ctaTitle="View All"
      ctaLink="javasript:"
      topCta={true}
    >
      {!loading ? (
        <div className={style.main__wrapper}>
          {bookings?.data &&
            bookings?.data.length > 0 &&
            bookings?.data?.map((card: any, index: number) => {
              return (
                <div className={style.card__wrapper} key={index}>
                  <div className={style.card}>
                    <div className={style.title__wrapper}>
                      <h4 className="m-0 fw-500">{card?.title}</h4>
                      <div className={style.count}>
                        {card?.count.toString().padStart(2, 0)}
                      </div>
                    </div>

                    {card?.bookingDecription?.map(
                      (booking: any, idx: number) => {
                        return (
                          <div key={idx} className={style.booking__list}>
                            <div className={style.list__item}>
                              <h4 className={style.time}>
                                {booking.from} - {booking.to}
                              </h4>
                              <div className={style.details}>
                                <div className={style.img__wrapper}>
                                  {booking.img ? (
                                    <Image
                                      src={booking.img}
                                      alt="booking"
                                      width={26}
                                      height={26}
                                      className="img-hack"
                                    />
                                  ) : (
                                    <Placeholder customClass="icon" />
                                  )}
                                </div>
                                <div className={style.content}>
                                  <h5 className="fw-400 m-0">
                                    {booking.title}
                                  </h5>
                                  <p className="p sm-font secondary-col">
                                    {booking.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
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
    </WrapperFrame>
  );
};

export default BookingsToday;
