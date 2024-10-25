"use client";

import { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import style from "./index.module.scss";

const BarChart = ({ data }: any): JSX.Element => {
  const font = "Lufga";
  const secondaryColor = "#617f90";

  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    chart.zoomOutButton.set("forceHidden", true);

    // Create X-Axis (Category Axis)
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      location: 0.5,
      fontFamily: font,
      fill: am5.color(secondaryColor),
    });

    // Format data for the X-Axis
    const months = data.map((row: any) => ({ month: row?.month?.slice(0, 3) }));

    xAxis.data.setAll(months); // X-axis expects objects, not just the month string

    // Create Y-Axis (Value Axis)
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 30,
          inside: false,
        }),
        // extraMin: 0.05,
        numberFormat: "#a",
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      paddingRight: 20,
      paddingBottom: 20,
      fontFamily: font,
      fill: am5.color(secondaryColor),
    });

    // Function to create series with color logic
    function createSeries(name: string, value: string) {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: value,
          categoryXField: "month",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{name}: {valueY}",
          }),
        })
      );

      series.columns.template.setAll({
        width: am5.percent(80),
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
      });

      // Modify data to assign value field
      const modifiedData = data.map((item: any, key: number) => ({
        month: item?.month?.slice(0, 3),
        [value]: item?.revenue, // Set the revenue field for the valueYField
        color: key % 2 === 0 ? am5.color("#5DA7E5") : am5.color("#0046AF"), // You can set dynamic colors here if needed
      }));

      series.data.setAll(modifiedData); // Bind data to series

      // Assign color from data to each column
      series.columns.template.adapters.add("fill", (fill: any, target: any) => {
        return target.dataItem?.dataContext.color;
      });

      series.columns.template.adapters.add(
        "stroke",
        (stroke: any, target: any) => {
          return target.dataItem?.dataContext.color;
        }
      );

      series.appear(1000);
    }

    // Create the series with alternating colors
    createSeries("Revenue", "revenue");

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div
      id="chartdiv"
      className={`${style.bar__chart} revenue-chart`}
      ref={chartRef}
    ></div>
  );
};

export default BarChart;
