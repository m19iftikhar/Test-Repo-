import {
  DurationComp,
  PeriodComp,
  StatusComp,
  ImageWithTextComp,
} from "@/app/components/Dashboard/DataGrid/DataGridComponents";
import ActionsDropdown from "@/app/components/General/ActionsDropdown";

import { CustomCellRendererProps } from "ag-grid-react";

import edit from "@/public/assets/svgs/edit.svg";
import deleteIcon from "@/public/assets/svgs/delete.svg";
import closeGray from "@/public/assets/svgs/close-gray.svg";
import checkGray from "@/public/assets/svgs/check-rounded-gray.svg";
import Receipt from "../components/Payments/Receipt";

export const renewalRequests = {
  columnsData: [
    {
      field: "company",
      headerName: "Company",
      filter: false,
    },
    {
      field: "plan",
      headerName: "Plan",
      filter: false,
      maxWidth: 191,
    },
    {
      field: "amount",
      headerName: "Amount",
      filter: false,
      maxWidth: 125,
    },
    {
      field: "daysLeft",
      headerName: "Days Left",
      filter: false,
      maxWidth: 100,
    },
    {
      field: "action",
      headerName: "Action",
      filter: false,
      maxWidth: 75,
      cellStyle: {
        justifyContent: "center",
      },
      cellRenderer: (params: CustomCellRendererProps) => {
        return (
          <ActionsDropdown
            rowData={params}
            actionItems={[
              {
                label: "Approve",
                hasAction: true,
                onClick: (rowData: any) => {
                  console.log("row data", rowData);
                },
                icon: checkGray,
                isDisabled: params.data.status === "Paid",
              },
              {
                label: "Reject",
                // href: "#",
                icon: closeGray,
                hasAction: true,
              },
            ]}
          />
        );
      },
    },
  ],
  rowsData: [
    {
      company: "FedEx",
      plan: "Dedicated Desk",
      amount: "AED 1,550",
      daysLeft: "03",
    },
    {
      company: "Emaar",
      plan: "Fixed Desk",
      amount: "AED 1,550",
      daysLeft: "02",
    },
    {
      company: "ADIB",
      plan: "Flexi Desk",
      amount: "AED 1,550",
      daysLeft: "05",
    },
    {
      company: "FedEx",
      plan: "Dedicated Desk",
      amount: "AED 1,550",
      daysLeft: "05",
    },
  ],
};

export const outstandingPayments = {
  columnsData: [
    {
      field: "invoiceID",
      headerName: "Invoice ID",
      filter: false,
    },
    {
      field: "company",
      headerName: "Company",
      filter: false,
    },
    {
      field: "date",
      headerName: "Date",
      filter: false,
      maxWidth: 163,
    },
    {
      field: "amount",
      headerName: "Amount",
      filter: false,
      maxWidth: 130,
    },
    {
      field: "action",
      headerName: "Action",
      filter: false,
      maxWidth: 75,
      cellStyle: {
        justifyContent: "center",
      },
      cellRenderer: (params: CustomCellRendererProps) => {
        return (
          <ActionsDropdown
            rowData={params}
            actionItems={[
              {
                label: "Edit",
                hasAction: true,
                icon: edit,
                onClick: (rowData: any) => {
                  console.log("row data", rowData);
                },
              },
              {
                label: "Delete",
                icon: deleteIcon,

                // href: "#",
                hasAction: true,
              },
            ]}
          />
        );
      },
    },
  ],
  rowsData: [
    {
      invoiceNo: "CTN-#1234567",
      company: "Luna Technology",
      date: "5-Aug-2024",
      amount: "AED 1,550",
    },
    {
      invoiceNo: "CTN-#1234567",
      company: "Luna Technology",
      date: "5-Aug-2024",
      amount: "AED 1,550",
    },
    {
      invoiceNo: "CTN-#1234567",
      company: "Luna Technology",
      date: "5-Aug-2024",
      amount: "AED 1,550",
    },
    {
      invoiceNo: "CTN-#1234567",
      company: "Luna Technology",
      date: "5-Aug-2024",
      amount: "AED 1,550",
    },
    {
      invoiceNo: "CTN-#1234567",
      company: "Luna Technology",
      date: "5-Aug-2024",
      amount: "AED 1,550",
    },
    {
      invoiceNo: "CTN-#1234567",
      company: "Luna Technology",
      date: "5-Aug-2024",
      amount: "AED 1,550",
    },
  ],
};

export const locations = {
  // columnsData: [
  //   {
  //     field: "title",
  //     headerName: "Location",
  //     cellRenderer: ImageWithTextComp,
  //   },
  //   {
  //     field: "startTime",
  //   },
  //   {
  //     field: "endTime",
  //   },
  //   {
  //     field: "timeZone",
  //   },
  //   {
  //     field: "action",
  //     maxWidth: 120,
  //     filter: false,
  //     cellStyle: {
  //       justifyContent: "center",
  //     },
  //     cellRenderer: (params: CustomCellRendererProps) => {
  //       return (
  //         <ActionsDropdown
  //           rowData={params}
  //           actionItems={[
  //             {
  //               label: "Edit",
  //               hasAction: true,
  //               onClick: (rowData: any) => {
  //                 console.log("row data", rowData);
  //               },
  //               icon: edit,
  //             },
  //             {
  //               label: "Delete",
  //               href: "#",
  //               icon: deleteIcon,
  //             },
  //           ]}
  //         />
  //       );
  //     },
  //   },
  // ],
  columnsData: [
    {
      field: "locationName",
      headerName: "Location",
      // cellRenderer: ImageWithTextComp,
    },
    {
      field: "hoursStart",
      headerName: "Start Time",
    },
    {
      field: "hoursEnd",
      headerName: "End Time",
    },
    {
      field: "timeZoneName",
      headerName: "Time Zone",
    },
    {
      field: "action",
      maxWidth: 120,
      filter: false,
      cellStyle: {
        justifyContent: "center",
      },
      cellRenderer: (params: CustomCellRendererProps) => {
        return (
          <ActionsDropdown
            rowData={params}
            actionItems={[
              {
                label: "Edit",
                hasAction: true,
                onClick: (rowData: any) => {
                  console.log("row data", rowData);
                },
                icon: edit,
              },
              {
                label: "Delete",
                href: "#",
                icon: deleteIcon,
              },
            ]}
          />
        );
      },
    },
  ],
  rowsData: [
    {
      title: "DIFC FinTech Hive",
      startTime: "08:00 AM",
      endTime: "18:00 PM",
      timeZone: "GMT +04:00 Asia/Dubai",
      image: "/assets/images/inventory/location.png",
    },
    {
      title: "DIFC Innovation Hive",
      startTime: "08:00 AM",
      endTime: "18:00 PM",
      timeZone: "GMT +04:00 Asia/Dubai",
      image: "/assets/images/inventory/location.png",
    },
    {
      title: "Innovation One",
      startTime: "08:00 AM",
      endTime: "18:00 PM",
      timeZone: "GMT +04:00 Asia/Dubai",
      image: "/assets/images/inventory/location.png",
    },
    {
      title: "DIFC FinTech Hive",
      startTime: "08:00 AM",
      endTime: "18:00 PM",
      timeZone: "GMT +04:00 Asia/Dubai",
      image: "/assets/images/inventory/location.png",
    },
    {
      title: "DIFC FinTech Hive",
      startTime: "08:00 AM",
      endTime: "18:00 PM",
      timeZone: "GMT +04:00 Asia/Dubai",
      image: "/assets/images/inventory/location.png",
    },
    {
      title: "DIFC FinTech Hive",
      startTime: "08:00 AM",
      endTime: "18:00 PM",
      timeZone: "GMT +04:00 Asia/Dubai",
      image: "/assets/images/inventory/location.png",
    },
    {
      title: "DIFC FinTech Hive",
      startTime: "08:00 AM",
      endTime: "18:00 PM",
      timeZone: "GMT +04:00 Asia/Dubai",
      image: "/assets/images/inventory/location.png",
    },
    {
      title: "DIFC FinTech Hive",
      startTime: "08:00 AM",
      endTime: "18:00 PM",
      timeZone: "GMT +04:00 Asia/Dubai",
      image: "/assets/images/inventory/location.png",
    },
    {
      title: "DIFC FinTech Hive",
      startTime: "08:00 AM",
      endTime: "18:00 PM",
      timeZone: "GMT +04:00 Asia/Dubai",
      image: "/assets/images/inventory/location.png",
    },
  ],
};

export const meetingRooms = {
  rowsData: [
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "DIFC FinTech Hive",
      floor: "Floor A",
      capacity: "16",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "DIFC FinTech Hive",
      floor: "Floor A",
      capacity: "16",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "DIFC FinTech Hive",
      floor: "Floor A",
      capacity: "16",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "DIFC FinTech Hive",
      floor: "Floor A",
      capacity: "16",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "DIFC FinTech Hive",
      floor: "Floor A",
      capacity: "16",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "DIFC FinTech Hive",
      floor: "Floor A",
      capacity: "16",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "DIFC FinTech Hive",
      floor: "Floor A",
      capacity: "16",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "DIFC FinTech Hive",
      floor: "Floor A",
      capacity: "16",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "DIFC FinTech Hive",
      floor: "Floor A",
      capacity: "16",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
    },
  ],
};

export const eventSpaces = {
  rowsData: [
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "Coworking Floor 1",
      capacity: "550",
      area: "2000 Sq.ft",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "Coworking Floor 1",
      capacity: "550",
      area: "2000 Sq.ft",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
      status: "Unavailable",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "Coworking Floor 1",
      capacity: "550",
      area: "2000 Sq.ft",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "Coworking Floor 1",
      capacity: "550",
      area: "2000 Sq.ft",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "Coworking Floor 1",
      capacity: "550",
      area: "2000 Sq.ft",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "Coworking Floor 1",
      capacity: "550",
      area: "2000 Sq.ft",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "Coworking Floor 1",
      capacity: "550",
      area: "2000 Sq.ft",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "Coworking Floor 1",
      capacity: "550",
      area: "2000 Sq.ft",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "Coworking Floor 1",
      capacity: "550",
      area: "2000 Sq.ft",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "Coworking Floor 1",
      capacity: "550",
      area: "2000 Sq.ft",
      hourly: "AED 100",
      halfDay: "AED 450",
      fullDay: "AED 750",
      status: "Available",
    },
  ],
};

export const closedOffices = {
  columnsData: [
    {
      field: "name",
      headerName: "Name",
      minWidth: 203,
      cellRenderer: ImageWithTextComp,
    },
    {
      field: "location",
      minWidth: 178,
    },
    {
      field: "floor",
      minWidth: 178,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      minWidth: 158,
    },
    {
      field: "area",
      headerName: "Area",
      minWidth: 158,
    },
    {
      field: "Availability",
      cellRenderer: DurationComp,
      minWidth: 131,
    },
    {
      field: "action",
      filter: false,
      maxWidth: 90,
      cellStyle: {
        justifyContent: "center",
      },
      cellRenderer: (params: CustomCellRendererProps) => {
        return (
          <ActionsDropdown
            rowData={params}
            actionItems={[
              {
                label: "Edit",
                hasAction: true,
                onClick: (rowData: any) => {
                  console.log("row data", rowData);
                },
                icon: edit,
              },
              {
                label: "Delete",
                href: "#",
                icon: deleteIcon,
              },
            ]}
          />
        );
      },
    },
  ],
  rowsData: [
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "CoWork-Space 1",
      capacityOrArea: "130",
      targetPlan: "Closed Office",
      price: "AED 1000",
      deposit: "AED 500",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "CoWork-Space 1",
      capacityOrArea: "130",
      targetPlan: "Closed Office",
      price: "AED 1000",
      deposit: "AED 500",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Occupied",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "CoWork-Space 1",
      capacityOrArea: "130",
      targetPlan: "Closed Office",
      price: "AED 1000",
      deposit: "AED 500",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Unavailable",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "CoWork-Space 1",
      capacityOrArea: "130",
      targetPlan: "Closed Office",
      price: "AED 1000",
      deposit: "AED 500",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "CoWork-Space 1",
      capacityOrArea: "130",
      targetPlan: "Closed Office",
      price: "AED 1000",
      deposit: "AED 500",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "CoWork-Space 1",
      capacityOrArea: "130",
      targetPlan: "Closed Office",
      price: "AED 1000",
      deposit: "AED 500",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "CoWork-Space 1",
      capacityOrArea: "130",
      targetPlan: "Closed Office",
      price: "AED 1000",
      deposit: "AED 500",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "CoWork-Space 1",
      capacityOrArea: "130",
      targetPlan: "Closed Office",
      price: "AED 1000",
      deposit: "AED 500",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "CoWork-Space 1",
      capacityOrArea: "130",
      targetPlan: "Closed Office",
      price: "AED 1000",
      deposit: "AED 500",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      floor: "CoWork-Space 1",
      capacityOrArea: "130",
      targetPlan: "Closed Office",
      price: "AED 1000",
      deposit: "AED 500",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
  ],
};

export const lockers = {
  columnsData: [
    {
      field: "location",
    },
    {
      field: "floor",
    },
    {
      field: "name",
    },
    {
      field: "availability",
      cellRenderer: StatusComp,
    },
    {
      field: "action",
      maxWidth: 120,
      filter: false,
      cellStyle: {
        justifyContent: "center",
      },
      cellRenderer: (params: CustomCellRendererProps) => {
        return (
          <ActionsDropdown
            rowData={params}
            actionItems={[
              {
                label: "Edit",
                hasAction: true,
                onClick: (rowData: any) => {
                  console.log("row data", rowData);
                },
                icon: edit,
              },
              {
                label: "Delete",
                hasAction: true,
                icon: deleteIcon,
                onClick: (rowData: any) => {
                  console.log("row data", rowData);
                },
              },
            ]}
          />
        );
      },
    },
  ],
  rowsData: [
    {
      location: "Innovation One",
      floor: "Coworking Floor 1",
      lockerName: "IH-1-01",
      availability: "Available",
    },
    {
      location: "Innovation One",
      floor: "Coworking Floor 1",
      lockerName: "IH-1-02",
      availability: "Unavailable",
    },
    {
      location: "Innovation One",
      floor: "Coworking Floor 1",
      lockerName: "IH-1-03",
      availability: "Available",
    },
    {
      location: "Innovation One",
      floor: "Coworking Floor 1",
      lockerName: "IH-1-04",
      availability: "Available",
    },
    {
      location: "Innovation One",
      floor: "Coworking Floor 1",
      lockerName: "IH-1-05",
      availability: "Available",
    },
    {
      location: "Innovation One",
      floor: "Coworking Floor 1",
      lockerName: "IH-1-06",
      availability: "Available",
    },
  ],
};

export const desks = {
  columnsData: [
    {
      field: "title",
      headerName: "Name",
      minWidth: 220,
      cellRenderer: ImageWithTextComp,
    },
    {
      field: "location",
    },
    {
      field: "deskType",
    },
    {
      field: "floor",
    },
    {
      field: "Availability",
      cellRenderer: DurationComp,
    },
    {
      field: "status",
      cellRenderer: StatusComp,
    },
    {
      field: "action",
      filter: false,
      maxWidth: 120,
      cellStyle: {
        justifyContent: "center",
      },
      cellRenderer: (params: CustomCellRendererProps) => {
        return (
          <ActionsDropdown
            rowData={params}
            actionItems={[
              {
                label: "Edit",
                hasAction: true,
                onClick: (rowData: any) => {
                  console.log("row data", rowData);
                },
                icon: edit,
              },
              {
                label: "Delete",
                href: "#",
                icon: deleteIcon,
              },
            ]}
          />
        );
      },
    },
  ],
  rowsData: [
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      deskType: "Flexi Desk",
      floor: "Co Work-Space",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      deskType: "Flexi Desk",
      floor: "Co Work-Space",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Unavailable",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      deskType: "Flexi Desk",
      floor: "Co Work-Space",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      deskType: "Flexi Desk",
      floor: "Co Work-Space",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      deskType: "Flexi Desk",
      floor: "Co Work-Space",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      deskType: "Flexi Desk",
      floor: "Co Work-Space",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      deskType: "Flexi Desk",
      floor: "Co Work-Space",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      deskType: "Flexi Desk",
      floor: "Co Work-Space",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      deskType: "Flexi Desk",
      floor: "Co Work-Space",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      deskType: "Flexi Desk",
      floor: "Co Work-Space",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
    {
      title: "HDMI Room",
      image: "/assets/images/inventory/rooms.png",
      location: "Innovation One",
      deskType: "Flexi Desk",
      floor: "Co Work-Space",
      startDate: "May 25,2024",
      endDate: "May 30, 2024",
      status: "Available",
    },
  ],
};

export const payments = {
  columnsData: [
    {
      field: "paymentRefNo",
    },
    {
      field: "paymentDate",
    },
    {
      field: "paymentMethod",
    },
    {
      field: "items",
      minWidth: 250,
    },
    {
      field: "amount",
    },
    {
      field: "receipt",
      cellRenderer: Receipt,
    },
    {
      field: "status",
      cellRenderer: StatusComp,
    },
    {
      field: "action",
      filter: false,
      maxWidth: 120,
      cellStyle: {
        justifyContent: "center",
      },
      cellRenderer: (params: CustomCellRendererProps) => {
        return (
          <ActionsDropdown
            rowData={params}
            actionItems={[
              {
                label: "Edit",
                hasAction: true,
                onClick: (rowData: any) => {
                  console.log("row data", rowData);
                },
                icon: edit,
              },
              {
                label: "Delete",
                href: "#",
                icon: deleteIcon,
              },
            ]}
          />
        );
      },
    },
  ],
  rowsData: [
    {
      paymentRef: "#1234567789",
      paymentDate: "Jul 25, 2024",
      paymentMethod: "Bank Transfer",
      items: "Flexi-Desk, Dedicated-Desk",
      amount: "AED 6000",
      status: "Available",
    },
    {
      paymentRef: "#1234567789",
      paymentDate: "Jul 25, 2024",
      paymentMethod: "Bank Transfer",
      items: "Flexi-Desk, Dedicated-Desk",
      amount: "AED 6000",
      status: "Available",
    },
    {
      paymentRef: "#1234567789",
      paymentDate: "Jul 25, 2024",
      paymentMethod: "Bank Transfer",
      items: "Flexi-Desk, Dedicated-Desk",
      amount: "AED 6000",
      status: "Available",
    },
    {
      paymentRef: "#1234567789",
      paymentDate: "Jul 25, 2024",
      paymentMethod: "Bank Transfer",
      items: "Flexi-Desk, Dedicated-Desk",
      amount: "AED 6000",
      status: "Available",
    },
    {
      paymentRef: "#1234567789",
      paymentDate: "Jul 25, 2024",
      paymentMethod: "Bank Transfer",
      items: "Flexi-Desk, Dedicated-Desk",
      amount: "AED 6000",
      status: "Available",
    },
    {
      paymentRef: "#1234567789",
      paymentDate: "Jul 25, 2024",
      paymentMethod: "Bank Transfer",
      items: "Flexi-Desk, Dedicated-Desk",
      amount: "AED 6000",
      status: "Available",
    },
    {
      paymentRef: "#1234567789",
      paymentDate: "Jul 25, 2024",
      paymentMethod: "Bank Transfer",
      items: "Flexi-Desk, Dedicated-Desk",
      amount: "AED 6000",
      status: "Available",
    },
    {
      paymentRef: "#1234567789",
      paymentDate: "Jul 25, 2024",
      paymentMethod: "Bank Transfer",
      items: "Flexi-Desk, Dedicated-Desk",
      amount: "AED 6000",
      status: "Available",
    },
    {
      paymentRef: "#1234567789",
      paymentDate: "Jul 25, 2024",
      paymentMethod: "Bank Transfer",
      items: "Flexi-Desk, Dedicated-Desk",
      amount: "AED 6000",
      status: "Available",
    },
  ],
};
