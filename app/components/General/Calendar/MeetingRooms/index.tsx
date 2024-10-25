import SvgComp from "@/app/components/General/SvgComp";

import style from "./MeetingRooms.module.scss";

const MeetingRooms = ({ data }: any) => {
  return (
    <div className={style.roomsContainer}>
      {data?.map((room: any) => {
        return (
          <div key={room.id} className={style.room}>
            <div className={style.content}>
              <div className={style.name}>{room.name}</div>
              <div>{room.space}</div>
              <div className={style.details}>
                <div>AED {room.hourlyRate}/ Hour</div>
                <div className={style.totalBookings}>
                  {room.totalBookings}
                  <SvgComp src="/assets/svgs/members-group.svg" />
                </div>
              </div>
            </div>
            <div
              style={{ backgroundColor: room.color }}
              className={style.indicator}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default MeetingRooms;
