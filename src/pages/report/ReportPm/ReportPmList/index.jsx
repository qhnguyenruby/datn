import React from "react";
import "./index.scss";
import ReportPmListGroup from "./ReportPmListGroup";

const ReportPmList = ({ data }) => {
  return (
    <div className="report-pm-list">
      {data.map((dataItem) => (
        <ReportPmListGroup data={dataItem} key={dataItem.id} />
      ))}
    </div>
  );
};

export default ReportPmList;
