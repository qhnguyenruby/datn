import React from "react";
import { convertColorToGradient } from "../../../utils/convertColorToGradient";
import { convertMinutesToHours } from "../../../utils/convertMinutesToHours";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import "./ReportPersonalList.scss";
import { Box, CircularProgress } from "@mui/material";

const ReportPersonalList = ({ dataList, isLoading }) => {
  return (
    <div className="report-personal-by-project-list">
      <div className="report-personal-by-project-list-header">
        <div className="report-personal-by-project-list-header-label">
          Project
        </div>
        <div className="report-personal-by-project-list-header-tracked-time">
          Tracked time (h)
        </div>
      </div>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "64px",
            marginBottom: "100px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="report-personal-by-project-list-container">
          {dataList.length === 0 ? (
            <div
              className="report-personal-by-project-list-container-group"
              style={{
                fontFamily: "Lato",
                fontSize: "16px",
                display: "flex",
                justifyContent: "center",
                paddingBottom: "6px",
              }}
            >
              You don't have any project <PriorityHighIcon />
            </div>
          ) : (
            dataList.map((item, index) => (
              <div
                className="report-personal-by-project-list-container-group"
                key={index}
              >
                <div className="report-personal-by-project-list-container-group-project">
                  <div
                    className="report-personal-by-project-list-container-group-project-color"
                    style={{ background: convertColorToGradient(item.color) }}
                  ></div>
                  <div className="report-personal-by-project-list-container-group-project-name">
                    {item.projectName}
                  </div>
                </div>
                <div className="report-personal-by-project-list-container-group-task">
                  {item.projectTasks.length &&
                    item.projectTasks.map((task, index) => (
                      <div
                        className="report-personal-by-project-list-container-group-task-item"
                        key={index}
                      >
                        <div className="report-personal-by-project-list-container-group-task-item-dot"></div>
                        <div className="report-personal-by-project-list-container-group-task-item-name">
                          {task.taskName}
                        </div>
                        <div className="report-personal-by-project-list-container-group-task-item-time">
                          {convertMinutesToHours(task.trackedTime)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ReportPersonalList;
