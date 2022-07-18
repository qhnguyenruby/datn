import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { ClickAwayListener } from "@mui/material";
import { Box } from "@mui/system";
import DescDropdownItem from "../../../components/DescDropdownItem";
import TaskDropdownGroup from "../../../components/TaskDropdownGroup";
import { FORMAT_TIME } from "../../../constants/common";
import moment from "moment";
import { useEffect, useState } from "react";
import EditTimeWorking from "./EditTimeWorking";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./WorkingDurationItem.scss";
import { useDispatch } from "react-redux";
import Notification from "../../../components/Form/Notification";
import { timeEntryApi } from "../../../api/time_entry/time_entry.api";
import jwtDecode from "jwt-decode";
import { deleteWorkByDay } from "../../../redux/slices/workByDaySlice";

const { confirm } = Modal;

const WorkingDurationItem = ({
  projectName,
  projectTaskName,
  description,
  id,
  timeStart,
  timeEnd,
  listWork,
  projectData,
  maxTime,
  minTime,
  projectId,
  projectTaskId,
  isLastWork,
  color,
  handleClickWorking,
}) => {
  const dispatch = useDispatch();
  const [descInput, setDescInput] = useState(description);
  const [taskData, setTaskData] = useState({
    projectTaskName: projectTaskName,
    projectName: projectName,
    color: color,
  });
  const [dropdownDescActive, setDropdownDescActive] = useState(false);
  const [dropdownTaskActive, setDropdownTaskActive] = useState(false);
  const [editTimeStartActive, setEditTimeStartActive] = useState(false);
  const [editTimeEndActive, setEditTimeEndActive] = useState(false);
  const [timeStartState, setTimeStartState] = useState(timeStart);
  const [timeEndState, setTimeEndState] = useState(timeEnd);
  const [duration, setDuration] = useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });
  const userId = jwtDecode(localStorage.getItem("token")).id;

  const handleDropdownTaskChoice = ({ taskName, projectName, color }) => {
    setTaskData({ taskName, projectName, color });
    setDropdownTaskActive(false);
  };

  const handleClickItemDesc = ({
    description,
    taskName,
    projectName,
    projectTaskId,
    projectId,
    color,
  }) => {
    setDescInput(description);
    setTaskData({ taskName, projectName, color });
    setDropdownDescActive(false);
    handleUpdateDescWork(description, projectTaskId, projectId);
  };

  const handleEditTime = (where, time) => {
    if (where === "timeStart") {
      setTimeStartState(time);
    }
    if (where === "timeEnd") {
      setTimeEndState(time);
    }
  };

  const handleUpdateTimeStartWork = async () => {};
  // const handleUpdateTimeStartWork = async () => {
  //   const newDataWork = {
  //     id: id,
  //     description,
  //     timeStart: `${dateCrr} ${timeStartState}`,
  //     timeEnd: `${dateCrr} ${timeEndState}`,
  //     projectId,
  //     taskId,
  //   };
  //   await WorkingService.updateWorkingDurationTime(idUser, newDataWork);
  // };

  const handleUpdateDescWork = async (description, taskId, projectId) => {};
  // const handleUpdateDescWork = async (description, taskId, projectId) => {
  //   const newDataWork = {
  //     id: id,
  //     description,
  //     timeStart: `${dateCrr} ${timeStartState}`,
  //     timeEnd: `${dateCrr} ${timeEndState}`,
  //     projectId,
  //     taskId,
  //   };
  //   await WorkingService.updateWorkingDurationDesc(idUser, newDataWork);
  // };

  useEffect(() => {
    const mins = moment
      .utc(
        moment(timeEndState, FORMAT_TIME).diff(
          moment(timeStartState, FORMAT_TIME)
        )
      )
      .format("HH:mm");
    setDuration(mins);
  }, [timeEndState, timeStartState]);

  const showModalConfirmDelete = (id, name) => {
    confirm({
      centered: true,
      title: "Delete working",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete working "${name}"?`,
      async onOk() {
        const deleteRes = await timeEntryApi.deleteTimeEntry(userId, id);
        if (!deleteRes) {
          console.log("Oops errors!");
          return;
        }
        dispatch(deleteWorkByDay(id));
        setNotify({
          isOpen: true,
          message: "Deleted time entry for this task",
          type: "success",
        });
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <div className="working-duration-item">
        <div className="working-duration-item-icon-delete">
          <DeleteIcon
            onClick={() => showModalConfirmDelete(id, description)}
            sx={{
              margin: "8px",
              fontSize: "24px",
              color: "#DDDDDD;",
              paddingTop: "2px",
            }}
          />
        </div>
        <div className="working-duration-item-container">
          <div className="working-duration-item-name-working">
            <span onClick={() => setDropdownDescActive(true)}>{descInput}</span>
            {dropdownDescActive && (
              <div className="working-duration-item-name-working-desc-dropdown">
                <div className="working-duration-item-name-working-desc-dropdown-header">
                  Recent task
                </div>
                <ClickAwayListener
                  onClickAway={() => {
                    setDropdownDescActive(false);
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    {listWork.map((work) => (
                      <DescDropdownItem
                        key={work.id}
                        handleClickItemDesc={handleClickItemDesc}
                        {...work}
                      />
                    ))}
                  </Box>
                </ClickAwayListener>
              </div>
            )}
          </div>
          <div
            className="working-duration-item-name"
            onClick={() => setDropdownTaskActive(true)}
          >
            <div
              className="working-duration-item-color-project"
              style={{ backgroundColor: taskData.color }}
            ></div>
            <div className="working-duration-item-name-project">
              {taskData.projectName}
            </div>
            <div className="working-duration-item-name-dot"></div>
            <div className="working-duration-item-name-task">
              <span>{taskData.projectTaskName}</span>
              {dropdownTaskActive && (
                <div
                  className="working-duration-item-name-task-act-dropdown"
                  onClick={(event) => event.stopPropagation()}
                >
                  <ClickAwayListener
                    onClickAway={() => {
                      setDropdownTaskActive(false);
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      {projectData.map((project) => (
                        <TaskDropdownGroup
                          key={project.id}
                          {...project}
                          handleDropdownTaskChoice={handleDropdownTaskChoice}
                        />
                      ))}
                    </Box>
                  </ClickAwayListener>
                </div>
              )}
            </div>
          </div>
          <div className="working-duration-item-time">
            <div className="working-duration-item-time-start">
              <ClickAwayListener
                onClickAway={() => {
                  setEditTimeStartActive(false);
                  timeStartState !== timeStart && handleUpdateTimeStartWork();
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <button onClick={() => setEditTimeStartActive(true)}>
                    {timeStartState}
                  </button>

                  {editTimeStartActive && (
                    <EditTimeWorking
                      handleEditTime={handleEditTime}
                      timeWork={timeStartState}
                      where={"timeStart"}
                      minTime={minTime === undefined ? "12:00 AM" : minTime}
                      maxTime={timeEndState}
                    />
                  )}
                </Box>
              </ClickAwayListener>
            </div>
            <div className="working-duration-item-icon-timetotime">
              <ArrowRightAltIcon sx={{ fontSize: "14px", padding: "2px" }} />
            </div>
            <div className="working-duration-item-time-end">
              <ClickAwayListener
                onClickAway={() => {
                  setEditTimeEndActive(false);
                  timeEndState !== timeEnd && handleUpdateTimeStartWork();
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <button onClick={() => setEditTimeEndActive(true)}>
                    {timeEndState}
                  </button>
                  {editTimeEndActive && (
                    <EditTimeWorking
                      handleEditTime={handleEditTime}
                      timeWork={timeEndState}
                      where={"timeEnd"}
                      minTime={timeStartState}
                      maxTime={maxTime === undefined ? "11:59 PM" : maxTime}
                      isLastWork={isLastWork}
                    />
                  )}
                </Box>
              </ClickAwayListener>
            </div>
          </div>
          <div className="working-duration-item-time-total">{duration}</div>
        </div>
        <div className="working-duration-item-icon-play">
          <PlayArrowIcon
            sx={{
              margin: "8px",
              fontSize: "20px",
              color: "#fff",
            }}
            onClick={() =>
              handleClickWorking({
                description: description,
                projectTaskName: projectTaskName,
                projectName: projectName,
                projectTaskId: projectTaskId,
                projectId: projectId,
                color: color,
              })
            }
          />
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify}></Notification>
    </div>
  );
};

export default WorkingDurationItem;
