import React from "react";

const ReportDetailTable = ({ dataReportFormatted }) => {
  return (
    <table className="report-detail-table">
      <thead>
        <tr className="report-detail-table-header">
          <th className="report-detail-table-header-item">Date</th>
          <th className="report-detail-table-header-item">Description</th>
          <th className="report-detail-table-header-item">Project (Client)</th>
          <th className="report-detail-table-header-item">Person</th>
          <th className="report-detail-table-header-item">Time</th>
          <th className="report-detail-table-header-item">Hours</th>
        </tr>
      </thead>
      {dataReportFormatted?.map((group, index) => (
        <tbody key={index}>
          <tr className="report-detail-table-group">
            <td className="report-detail-table-group-label" colSpan={"5"}>
              {group.groupName}
            </td>
            <td className="report-detail-table-group-hours">
              {`${group.totalTime}h`}
            </td>
          </tr>
          {group.list.map((item, index) => {
            return (
              <tr className="report-detail-table-item" key={index}>
                <td className="report-detail-table-item-date">{item.date}</td>
                <td className="report-detail-table-item-desc">
                  {item.description}
                </td>
                <td className="report-detail-table-item-project">{`${item.project} (${item.client})`}</td>
                <td className="report-detail-table-item-person">
                  {item.member}
                </td>
                <td className="report-detail-table-item-time">
                  {`${item.timeStart}-${item.timeEnd}`}
                </td>
                <td className="report-detail-table-item-hours">{`${item.trackedTime}h`}</td>
              </tr>
            );
          })}
        </tbody>
      ))}
    </table>
  );
};

export default ReportDetailTable;
