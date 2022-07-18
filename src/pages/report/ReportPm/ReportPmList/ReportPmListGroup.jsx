import React, { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { convertColorToGradient } from "../../../../utils/convertColorToGradient";

const ReportPmListGroup = ({ data }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const handleShowMore = () => {
    setIsShowMore((prev) => !prev);
  };

  const formatMinsToHours = (mins) => {
    const hours = mins / 60;
    return hours.toFixed(1);
  };
  return (
    <div className="report-pm-list-group">
      <div
        className="report-pm-list-group-collapse"
        style={!isShowMore ? { boxShadow: "inset 0 -1px 0 0 #EEEEEE" } : {}}
      >
        <div className="report-pm-list-group-collapse-main">
          <div className="report-pm-list-group-collapse-main-icon">
            {isShowMore ? (
              <RemoveIcon sx={{ fontSize: "20px" }} onClick={handleShowMore} />
            ) : (
              <AddIcon sx={{ fontSize: "20px" }} onClick={handleShowMore} />
            )}
          </div>
          {data.avatarUrl && (
            <img
              src={data.avatarUrl}
              alt=""
              className="report-pm-list-group-collapse-main-avatar"
            />
          )}
          {data.color && (
            <div
              className="report-pm-list-group-collapse-main-color"
              style={{ background: convertColorToGradient(data.color) }}
            ></div>
          )}
          <div className="report-pm-list-group-collapse-main-name">
            {data.taskName || data.userName || data.projectName}
          </div>
        </div>
        <div className="report-pm-list-group-collapse-time">
          {`${formatMinsToHours(data.trackedTime)}h`}
        </div>
      </div>
      {isShowMore && (
        <div className="report-pm-list-group-show">
          {data.list?.map((item, index) => (
            <div className="report-pm-list-group-show-item" key={index}>
              {item.avatarUrl && (
                <img
                  src={item.avatarUrl}
                  alt=""
                  className="report-pm-list-group-show-item-avatar"
                />
              )}
              <div className="report-pm-list-group-show-item-name">
                {item.userName || item.taskName || item.description}
              </div>
              <div className="report-pm-list-group-show-item-space"></div>
              <div className="report-pm-list-group-show-item-time">
                {`${formatMinsToHours(item.trackedTime)}h`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportPmListGroup;
