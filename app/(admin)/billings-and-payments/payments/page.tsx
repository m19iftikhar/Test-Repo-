"use client";

import DataGrid from "@/app/components/Dashboard/DataGrid";
import { DurationComp, StatusComp } from "@/app/components/Dashboard/DataGrid/DataGridComponents";
import ActionsDropdown from "@/app/components/General/ActionsDropdown";
import PageTitle from "@/app/components/Inventory/PageTitle";
import Receipt from "@/app/components/Payments/Receipt";
import { getApiData } from "@/app/Utility/apiFunctions";
import { Pagination } from "@/app/Utility/commonTypes";
import { CustomCellRendererProps } from "ag-grid-react";
import approvedIcon from "@/public/assets/svgs/approved.svg";
import inprocessIcon from "@/public/assets/svgs/inprocess.svg";
import rejectIcon from "@/public/assets/svgs/reject.svg";


import { useEffect, useState } from "react";
import { useUpdatePaymentStatusMutation } from "@/app/redux/reducers/PaymentSlice/PaymentApiSlice";
import Alert from "@/app/components/Alert";
import { dateFormatter } from "@/app/Utility/utility";


const Payments = () => {
  const [data, setData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState([]);
  const [UpdatePaymentStatus] = useUpdatePaymentStatusMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<
    "success" | "failed" | "warning"
  >("success");



  const getAllPayments = async (query?: Pagination) => {
    try {
      const data = {
        version: "1",
        path: "v1/Payment",
        endpoint: "get-all-payments",
        queryParams: query,
      };
      let IncomingData = await getApiData(data);
      setData(IncomingData?.data?.payments)
      return {
        data: IncomingData?.data?.payments ?? [],
        totalCount: IncomingData?.data?.totalCount ?? 10,
      };
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  const getStatus = async (query?: any) => {
    try {
      const data = {
        version: "1",
        path: "v1/Payment",
        endpoint: "get-payments-status",
        queryParams: query,
      };
      let IncomingData = await getApiData(data);
      setStatusDropdown(IncomingData?.data)

      getAllPayments()
      return {
        data: IncomingData?.data ?? [],
      };
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  useEffect(() => {
    getStatus()
  }, [])



  const columnsData = [
    {
      field: "paymentRefNo",
    },
    {
      field: "paymentDate",
      valueFormatter: (params: any) => {
        let formattedDate = dateFormatter(params.data.paymentDate);
        return formattedDate;
      },
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
            actionItems={statusDropdown.map((status: any) => {
              let icon;

              switch (status.recId) {
                case 1:
                  icon = inprocessIcon;
                  break;
                case 2:
                  icon = approvedIcon;
                  break;
                case 3:
                  icon = rejectIcon;
                  break;
                default:
                  break;
              }

              return {
                label: status.name,
                hasAction: true,
                onClick: async (params: any) => {
                  let data = {
                    paymentId: params?.data?.reccId,
                    status: status.recId
                  }
                  const res = await UpdatePaymentStatus(data);
                  if (res) {
                    setShowAlert(true);
                    setAlertMessage("Successfully Update Status");
                    setAlertVariant("success");
                    setRefreshData((prev) => !prev);
                  } else {
                    setAlertMessage("Status Not Updated");
                    setAlertVariant("failed");
                    setShowAlert(true);
                  }
                },
                icon: icon,
              };
            })}
          />
        );
      },
    },
  ]

  return (
    <>
      <PageTitle title="Easily manage multiple event spaces from a single dashboard." />
      {showAlert && (
        <Alert
          message={alertMessage}
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
        />
      )}
      <DataGrid
        fetchData={getAllPayments}
        columnData={columnsData}
        key={Number(refreshData)}
      />

    </>
  );
};

export default Payments;
