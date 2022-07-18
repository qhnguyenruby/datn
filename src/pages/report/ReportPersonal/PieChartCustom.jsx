import React from "react";
import { PieChart, Pie, Tooltip, Cell, Label } from "recharts";
import { convertMinutesToHours } from "../../../utils/convertMinutesToHours";

export default function PieChartCustom({ data, colors, total }) {
  const formatMinsToHours = (value) => {
    return convertMinutesToHours(value);
  };
  return (
    <PieChart width={294} height={294}>
      <Pie
        dataKey="time"
        data={data}
        innerRadius={75}
        outerRadius={147}
        fill="#82ca10"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
        <Label
          value={total}
          offset={0}
          position="center"
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            fontFamily: "Montserrat",
            color: "#363636",
          }}
        />
      </Pie>
      <Tooltip dataKey="name" formatter={formatMinsToHours} />
    </PieChart>
  );
}
