import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./index.scss";

const DescDropdownItem = ({
  description,
  projectName,
  projectTaskName,
  handleClickItemDesc,
  projectTaskId,
  projectId,
  color,
}) => {
  return (
    <div
      className="desc-dropdown-item"
      onClick={() =>
        handleClickItemDesc({
          description,
          projectTaskName,
          projectName,
          projectTaskId,
          projectId,
          color,
        })
      }
    >
      <div className="desc-dropdown-item-desc">{description}</div>
      <div
        className="desc-dropdown-item-color"
        style={{ background: color }}
      ></div>
      <div className="desc-dropdown-item-name">
        <div className="desc-dropdown-item-name-project">{projectName}</div>
        <div className="desc-dropdown-item-name-dot"></div>
        <div className="desc-dropdown-item-name-task">{projectTaskName}</div>
      </div>

      <div className="desc-dropdown-item-icon-play">
        <PlayArrowIcon
          sx={{
            margin: "8px",
            fontSize: "20px",
            color: "#fff",
          }}
        />
      </div>
    </div>
  );
};

export default DescDropdownItem;
