"use client";

import {useForm} from "react-hook-form";
import SelectField from "../../General/FormElements/SelectField";
import WrapperFrame from "../../General/WrapperFrame";
import PieChart from "../PieChart";
import style from "./index.module.scss";
import {useEffect, useState} from "react";
import {useDashboardMembershipsQuery} from "@/app/redux/reducers/Dashboard/DashboardApiSlice";
import Spinner from "../../Spinner";

const Memberships = () => {
  const {data: memberships, isLoading: loading} =
    useDashboardMembershipsQuery();

  console.log(memberships, "memmm");

  const datad = [
    {value: 120, status: "Active"},
    {value: 30, status: "Ending"},
  ];

  const [chartData, setChartData] = useState([]);

  const data = memberships?.data?.map((item: any) => {
    return {
      value: item?.value,
      status: item?.status,
    };
  });

  useEffect(() => {
    if (memberships?.success) {
      setChartData(data);
    }
  }, [memberships]);

  const {control} = useForm({
    defaultValues: {
      filter: {
        label: "All",
        value: "all",
      },
    },
  });

  const filterOptions = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "Active",
      value: "Active",
    },
    {
      label: "Ending",
      value: "Ending",
    },
  ];

  return (
    <WrapperFrame title="Memberships" titleSpaceLg={true}>
      <div className={style.top__wrapper}>
        <div className={style.selectWrapper}>
          <SelectField
            name="filter"
            onChange={(selectValue: any) => {
              if (selectValue.value === "All") {
                setChartData(data);
              } else {
                setChartData(() => {
                  return data.filter((item: any) => {
                    return item.status === selectValue.value;
                  });
                });
              }
            }}
            control={control}
            customClass="chartSelect"
            options={filterOptions}
            minHeight="3em"
            placeholder="Select"
          />
        </div>
      </div>
      <div className={style.chart}>
        {!loading ? <PieChart data={chartData} /> : <Spinner />}
      </div>
    </WrapperFrame>
  );
};

export default Memberships;
