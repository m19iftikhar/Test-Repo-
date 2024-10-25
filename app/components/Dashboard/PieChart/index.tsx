"use client";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";
import style from "./index.module.scss";

const PieChart = ({ data }: any) => {
  const font = "Lufga";
  const secondaryColor = "#617f90";

  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    let series: any = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "status",
        startAngle: 40,
        endAngle: 400,
        colors: am5.ColorSet.new(root, {
          colors: [am5.color("#0046AF"), am5.color("#5DA7E5")],
          reuse: true,
        }),
        legendLabelText: "{value}",
        legendValueText: "{category}",
      })
    );

    series.data.setAll(data);

    series.slices.template.set(
      "tooltipText",
      `[fontFamily: ${font}]{value} {category}[/]`
    );
    series.labels.template.set(
      "text",
      `[${secondaryColor}][fontFamily: ${font}]{value} {category}[/]`
    );

    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );

    legend.data.setAll(series.dataItems);

    legend.valueLabels.template.setAll({
      fontFamily: font,
      fill: am5.color(secondaryColor),
    });

    legend.labels.template.setAll({
      fontFamily: font,
      fill: am5.color(secondaryColor),
    });

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return <div id="chartdiv" className={`${style.pie__chart} pie__chart`}></div>;
};

export default PieChart;
