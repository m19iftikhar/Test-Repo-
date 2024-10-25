export const meetingRooms = [
  {
    id: 1,
    name: "A1",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#0046AF",
  },
  {
    id: 2,
    name: "L1",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#FF8C00",
  },
  {
    id: 3,
    name: "L1, Board Room",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#773DBD",
  },
  {
    id: 4,
    name: "L1, Board Room 2",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#0046AF",
  },
  {
    id: 5,
    name: "L3, Board Room",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#FF0080",
  },
  {
    id: 6,
    name: "A1, Board Room",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#EF3249",
  },
  {
    id: 7,
    name: "A3, Board Room",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#0046AF",
  },
  {
    id: 8,
    name: "A1",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#0046AF",
  },
  {
    id: 9,
    name: "L1",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#FF8C00",
  },
  {
    id: 10,
    name: "L1, Board Room",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#773DBD",
  },
  {
    id: 11,
    name: "L1, Board Room 2",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#0046AF",
  },
  {
    id: 12,
    name: "L3, Board Room",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#FF0080",
  },
  {
    id: 13,
    name: "A1, Board Room",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#EF3249",
  },
  {
    id: 14,
    name: "A3, Board Room",
    space: "DIFC Tech Hive",
    hourlyRate: 20,
    totalBookings: 30,
    color: "#0046AF",
  },
];

export const events = [
  {
    // title: "event 1",
    // --- NOTE:  recurring events format
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    startTime: "01:00:00",
    endTime: "03:00:00",
    startRecur: "2024-09-29",
    endRecur: "2024-10-30",
    // --- end recurring events format
    color: "#FFF1F8",
    borderColor: "#FF0080",
    className: "custom-event-1",
    editable: false,
    textColor: "#000000",
    extendedProps: {
      myCustomProp: "my custom prop",
      memberName: "Luna Technologies",
    },
  },
  {
    // title: "event 1",
    // --- NOTE:  recurring events format
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    startTime: "02:30:00",
    endTime: "04:30:00",
    startRecur: "2024-09-29",
    endRecur: "2024-10-30",
    // ---  end recurring events format
    color: "rgba(243, 216, 252, 1)",
    borderColor: "#773DBD",
    className: "custom-event-1",
    editable: false,
    textColor: "#000000",
    extendedProps: {
      myCustomProp: "my custom prop",
      memberName: "Luna Technologies",
    },
  },
  // {
  //   title: "event 2",
  //   // -- NOTE: non recurring event format
  //   start: "2024-09-30T01:00:00",
  //   end: "2024-09-30T04:00:00",
  //   // -- end non recurring event format
  //   color: "#FBFCD8",
  //   className: "custom-event-2",
  //   editable: false,
  //   textColor: "#000000",
  //   allDay: false,
  //   extendedProps: {
  //     memberName: "Luna Technologies",
  //   },
  // },
];
