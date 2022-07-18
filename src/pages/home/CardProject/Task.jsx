import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Task = ({
  taskName,
  handleClickWorking,
  color,
  projectName,
  projectTaskId,
  projectId,
}) => {
  return (
    <div className="card-container-list-task-task">
      <div className="card-container-list-task-task-name">{taskName}</div>
      <div className="card-container-list-task-task-icon-run">
        <PlayArrowIcon
          sx={{ color: "white" }}
          onClick={() =>
            handleClickWorking({
              description: "",
              projectTaskName: taskName,
              projectName,
              projectTaskId,
              projectId,
              color,
            })
          }
        />
      </div>
    </div>
  );
};

export default Task;
