"use client";

import DataGrid from "@/app/components/Dashboard/DataGrid";
import WrapperFrame from "../../General/WrapperFrame";

import style from "./index.module.scss";

import {outstandingPayments} from "@/app/data/dataGrid";
import {Pagination} from "@/app/Utility/commonTypes";
import {getApiData} from "@/app/Utility/apiFunctions";

const OutstandingPayments = () => {
  const getOutstandingPayments = async (query?: Pagination) => {
    try {
      const data = {
        version: "1",
        path: "Dashboard",
        endpoint: "get-outStanding-Payment-statistics",
        queryParams: query,
      };
      let IncomingData = await getApiData(data);
      return {
        data: IncomingData?.data?.outStandingPaymentList ?? [],
        totalCount:
          IncomingData?.data?.totalCount ?? IncomingData?.data?.length,
      };
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  return (
    <WrapperFrame
      title="Outstanding Payments"
      ctaTitle="View All"
      ctaLink="javascript:">
      <div className={style.top__wrapper}>
        <div className={style.count}>10</div>
      </div>
      <div className={style.grid__wrapper}>
        <DataGrid
          addDefaultWrapper={false}
          pagination={false}
          customClass="dashboard-table"
          quickFilterTable={false}
          fetchData={getOutstandingPayments}
          columnData={outstandingPayments.columnsData}
        />
      </div>
    </WrapperFrame>
  );
};

export default OutstandingPayments;
