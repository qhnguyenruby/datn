import moment from "moment";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartCustom = ({ data }) => {
  const formatMinsYAxis = (value) => {
    return `${value} h`;
  };

  const formatMinsXAxis = (value) => {
    return moment.utc().startOf("day").add({ hours: value }).format("H:mm");
  };

  return (
    <BarChart
      width={1085}
      height={253}
      data={data}
      maxBarSize={93}
      margin={{
        top: 14,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="name" tickLine={false} tick={false} />
      <YAxis
        axisLine={false}
        tickLine={false}
        tickCount={6}
        tickFormatter={formatMinsYAxis}
      />
      <Tooltip
        formatter={(value) => [formatMinsXAxis(value), "Total"]}
        labelStyle={{
          fontWeight: "bold",
          color: "#363636",
          fontFamily: "Lato",
          fontSize: "14px",
        }}
        itemStyle={{
          color: "#363636",
          fontFamily: "Lato",
          fontSize: "14px",
          fontWeight: "400",
          paddingTop: "16px",
        }}
        contentStyle={{
          padding: "19px",
        }}
      />
      <Bar dataKey="time" fill="rgba(230,126,34,0.8)">
        <LabelList
          dataKey="time"
          position="top"
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "Lato",
            zIndex: "2",
          }}
          fill={"#363636"}
          formatter={formatMinsXAxis}
        />
        <LabelList
          dataKey="name"
          position="bottom"
          style={{
            fontSize: "12px",
            fontFamily: "Lato",
          }}
          fill={"rgba(54,54,54,0.7)"}
          offset={9}
        />
      </Bar>
    </BarChart>
  );
};

export default BarChartCustom;
