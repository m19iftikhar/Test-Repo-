"use client";

import WrapperFrame from "../../General/WrapperFrame";
import DataGrid from "@/app/components/Dashboard/DataGrid/";
import style from "./index.module.scss";
import { renewalRequests } from "@/app/data/dataGrid";
import { Pagination } from "@/app/Utility/commonTypes";
import { getApiData } from "@/app/Utility/apiFunctions";

const RenewalRequests = () => {
  const getRenewalRequests = async (query?: Pagination) => {
    try {
      const data = {
        version: "1",
        path: "Dashboard",
        endpoint: "get-pending-request-statistics",
        queryParams: query,
      };
      let IncomingData = await getApiData(data);
      console.log(IncomingData, "inco");
      return {
        data: IncomingData?.data?.pendingRequestList ?? [],
        totalCount:
          IncomingData?.data?.totalCount ?? IncomingData?.data?.length,
      };
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  return (
    <WrapperFrame
      title="Pending Requests"
      ctaTitle="View All"
      ctaLink="javascript:"
    >
      <div className={style.top__wrapper}>
        <div className={style.count}>06</div>
      </div>
      <div className={style.grid__wrapper}>
        <DataGrid
          pagination={false}
          quickFilterTable={false}
          addDefaultWrapper={false}
          customClass="dashboard-table"
          fetchData={getRenewalRequests}
          columnData={renewalRequests.columnsData}
        />
      </div>
    </WrapperFrame>
  );
};

export default RenewalRequests;
