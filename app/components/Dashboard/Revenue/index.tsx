"use client";

import { useForm } from "react-hook-form";

import BarChart from "../BarChart";
import SelectField from "../../General/FormElements/SelectField";
import WrapperFrame from "../../General/WrapperFrame";

import style from "./index.module.scss";

import { useEffect, useState } from "react";
import { useDashboardRevenusQuery } from "@/app/redux/reducers/Dashboard/DashboardApiSlice";
import Spinner from "../../Spinner";

interface ChartItem {
  year: number;
  month: string;
  value: number;
  color: string;
}

const Revenue = () => {
  const { data: revenues, isLoading: loading } = useDashboardRevenusQuery();

  const [data, setData]: any = useState([]);

  useEffect(() => {
    if (revenues?.success) {
      setData(revenues?.data);
    }
  }, [revenues]);

  const { control } = useForm({
    defaultValues: {
      filter: {
        label: 2024,
        value: 2024,
      },
    },
  });

  const filterOptions = [
    {
      label: 2024,
      value: 2024,
    },
    {
      label: 2023,
      value: 2023,
    },
    {
      label: 2022,
      value: 2022,
    },
  ];

  // const filterByYear = (year: any) => {
  //   const filteredData = barChartData.filter((item: any) => {
  //     return item.year === year;
  //   });

  //   return filteredData;
  // };

  // useEffect(() => {
  //   const filteredData = filterByYear(2024);
  //   setData(filteredData);
  // }, []);

  return (
    <WrapperFrame title="Revenue" titleSpaceLg={true}>
      <div className={style.top__wrapper}>
        <div className={style.selectWrapper}>
          <SelectField
            name="filter"
            onChange={(selectedValue: any) => {
              // const filteredData = filterByYear(selectedValue.value);
              // setData(filteredData);
              console.log(selectedValue);
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
        {data && data.length > 0 && !loading ? (
          <BarChart data={data} />
        ) : (
          <Spinner />
        )}
      </div>
    </WrapperFrame>
  );
};

export default Revenue;
