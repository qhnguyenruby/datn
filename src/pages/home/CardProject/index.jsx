import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { convertColorToGradient } from "../../../utils/convertColorToGradient";
import "./index.scss";
import Task from "./Task";

const CardProject = ({
  client,
  projectName,
  listTask,
  color,
  handleClickWorking,
  projectId,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const toggleCardHidden = () => {
    setIsHidden((prevValue) => !prevValue);
  };

  return (
    <>
      <div
        className={isHidden ? "card-container isHidden" : "card-container"}
        style={{ background: convertColorToGradient(color) }}
      >
        <div className="card-container-header">
          <div className="card-container-header-client">
            <div className="card-container-header-client-name">{client}</div>
            <div className="card-container-header-client-iconHide">
              {isHidden ? (
                <VisibilityIcon
                  onClick={toggleCardHidden}
                  sx={{
                    fontSize: 14,
                    marginLeft: 1,
                    cursor: "pointer",
                    color: "rgba(54, 54, 54, 0.3)",
                  }}
                />
              ) : (
                <VisibilityOffIcon
                  onClick={toggleCardHidden}
                  sx={{
                    fontSize: 14,
                    marginLeft: 1,
                    cursor: "pointer",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                />
              )}
            </div>
          </div>
          <div className="card-container-header-project">{projectName}</div>
        </div>
        <div className="card-container-list-task">
          {!isHidden &&
            listTask.length &&
            listTask.map((task) => (
              <Task
                taskName={task.taskName}
                key={task.id}
                handleClickWorking={handleClickWorking}
                color={color}
                projectName={projectName}
                projectTaskId={task.id}
                projectId={projectId}
              />
            ))}
        </div>
        {listTask.length > 4 && !isHidden && (
          <div className="card-container-footer">
            <div className="card-container-footer-text">View more...</div>
            <ArrowDropDownIcon sx={{ color: "white" }} />
          </div>
        )}
      </div>
    </>
  );
};

export default CardProject;
