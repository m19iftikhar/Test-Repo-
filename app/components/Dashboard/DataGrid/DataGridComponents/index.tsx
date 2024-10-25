import Image from "next/image";
import { CustomCellRendererProps } from "ag-grid-react";

import style from "./Datagrid.module.scss";
import { dateFormatter } from "@/app/Utility/utility";
import moment from "moment";
import Placeholder from "@/app/components/Placeholder";

export const StatusComp = (params: CustomCellRendererProps) =>
  params.value && (
    <div className={`gridHighlightBtn ${params.value ? params.value : ""}`}>
      {params.value}
    </div>
  );

export const ActionComp = (params: CustomCellRendererProps) =>
  params.value ? (
    <a
      href={params.value}
      className={`gridActionBtn ${params.value ? params.value : ""}`}
    >
      {`Pay Now`}
    </a>
  ) : (
    <div className="gridActionBtn disabled">{`Paid`}</div>
  );

export const PeriodComp = (params: CustomCellRendererProps) => {
  return (
    <div className="periodComp">
      <span>
        {params.data.startDate} - {params.data.endDate}
      </span>
      <span className="secondary-col">{params.data.billingDuration}</span>
    </div>
  );
};

export const DurationComp = (params: CustomCellRendererProps) => {
  return (
    <div className="periodComp">
      <div>
        {params.data.startDate ||
          moment(params.data.availableFrom).format("ll")}
      </div>
      <div className="secondary-col">
        {params.data.endDate || moment(params.data.availableTo).format("ll")}
      </div>
    </div>
  );
};

export const ImageWithTextComp = (params: CustomCellRendererProps) => {
  return (
    <div className={style.dataGrid}>
      <div>
        {params?.data?.attachment ? (
          <Image
            className={style.image}
            src={params?.data?.attachment}
            alt="image"
            width={50}
            height={50}
          />
        ) : (
          <div className={style.image}>
            <Placeholder customClass="xs" />
          </div>
        )}
      </div>
      <div>{params.data.name || params.data.locationName || ""}</div>
    </div>
  );
};
