"use client";

import { useRef, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

interface CalendarProps {
  data: any;
  initialView?: "dayGridMonth" | "timeGridWeek" | "timeGridDay";
  showHeaderToolbar?: boolean;
  calendarHeight?: string;
  showNowIndicator?: boolean;
  calendarRef?: any;
}

const Calendar = ({
  data,
  initialView = "timeGridWeek",
  showHeaderToolbar = true,
  calendarHeight = "46.875em",
  showNowIndicator,
  calendarRef,
}: CalendarProps) => {
  const [events, setEvents] = useState(data);

  const renderEventContent = (eventInfo: any) => {
    console.log(
      "----------------------- EVENT INFO FOR CARD CUSTOMIZATION -----------------------",
      eventInfo
    );

    const startDate = new Date(eventInfo.event.start).toLocaleTimeString(
      "en-US",
      {
        timeStyle: "short",
      }
    );

    const endDate = new Date(eventInfo.event.end).toLocaleTimeString("en-US", {
      timeStyle: "short",
    });

    return (
      <div>
        <div>
          {startDate} - {endDate}
        </div>
        <div>{eventInfo.event.title}</div>
        {eventInfo.event.extendedProps.memberName ? (
          <div>{eventInfo.event.extendedProps.memberName}</div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const handleDateClick = (arg: any) => {
    console.log(
      "----------------------- DATE CLICK -----------------------",
      arg
    );
  };

  const handleEventClick = (clickInfo: any) => {
    console.log(
      "----------------------- EVENT CLICKED: -----------------------",
      clickInfo.event.title,
      clickInfo.event.extendedProps,
      clickInfo.event.classNames,
      clickInfo.event.backgroundColor,
      clickInfo.event.start
    );
  };

  return (
    <div className="bookings-full-calendar">
      <FullCalendar
        {...(calendarRef ? { ref: calendarRef } : {})}
        weekends={true}
        events={events}
        height={calendarHeight}
        initialView={initialView}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        nowIndicator={showNowIndicator}
        eventContent={renderEventContent}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        nowIndicatorClassNames="custom-now-indicator"
        headerToolbar={
          showHeaderToolbar
            ? {
                start: "prev,today,next title",
                center: "",
                end: "dayGridMonth,timeGridWeek,timeGridDay",
              }
            : false
        }
        views={{
          // week view
          timeGridWeek: {
            titleFormat: { day: "numeric", year: "numeric", month: "long" },
            titleRangeSeparator: " / ",
            allDayText: "ALL DAY",
            dayHeaderContent(renderProps: any) {
              console.log("render props", renderProps);
              return (
                <div>
                  <div>{renderProps.date.getDate()}</div>
                  <div>
                    {renderProps.date.toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </div>
                </div>
              );
            },
          },
          // day view
          timeGridDay: {
            dayHeaderContent(renderProps: any) {
              return (
                <div>
                  <div>
                    {renderProps.date.toLocaleDateString("en-US", {
                      weekday: "long",
                      day: "2-digit",
                    })}
                  </div>
                </div>
              );
            },
          },
        }}
      />
    </div>
  );
};

export default Calendar;
