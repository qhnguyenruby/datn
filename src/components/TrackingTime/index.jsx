// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import StopIcon from "@mui/icons-material/Stop";
// import { Box, ClickAwayListener } from "@mui/material";
// import { FORMAT_DATE, FORMAT_TIME } from "../../constants/common";
// import moment from "moment";
// import { useEffect, useState } from "react";

// // import {
// //   getWorkRunning,
// //   removeWorkRunning,
// //   setWorkRunning,
// // } from "services/localStorage";
// // import TrackingTimeService from "services/TrackingTimeService";
// import DescDropdownItem from "../DescDropdownItem";
// import TaskDropdownGroup from "../TaskDropdownGroup";
// import "./index.scss";

// const INIT_TASK_DATA = {
//   taskName: "",
//   projectName: "",
//   color: "",
// };

// const TrackingTime = ({ listWork, projectData, idUser, workingDataClick }) => {
//   const [descInput, setDescInput] = useState("");
//   const [taskData, setTaskData] = useState(INIT_TASK_DATA);
//   const [dropdownDescActive, setDropdownDescActive] = useState(false);
//   const [dropdownTaskActive, setDropdownTaskActive] = useState(false);
//   const [countTimeActive, setCountTimeActive] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [trackingClock, setTrackingClock] = useState("00:00:00");
//   const [workingData, setWorkingData] = useState({
//     description: "",
//     taskId: "",
//     projectId: "",
//     timeStart: undefined,
//     timeEnd: undefined,
//   });
//   const [timeStart, setTimeStart] = useState("");
//   const dateCrr = "2020-06-01";

//   const handleClickItemDesc = ({
//     description,
//     taskName,
//     projectName,
//     taskId,
//     projectId,
//     color,
//   }) => {
//     clearWorkingData();
//     setDescInput(description);
//     setTaskData({
//       taskName,
//       projectName,
//       color,
//     });
//     setWorkingData({
//       ...workingData,
//       description,
//       taskId,
//       projectId,
//     });
//   };

//   const handleDropdownDescActive = () => {
//     setTimeout(() => {
//       setDropdownDescActive(false);
//     }, 150);
//   };

//   const handleDropdownTaskChoice = ({
//     taskName,
//     projectName,
//     taskId,
//     projectId,
//     color,
//   }) => {
//     if (countTimeActive) clearWorkingData();

//     setTaskData({
//       taskName,
//       projectName,
//       color,
//     });
//     setWorkingData({
//       ...workingData,
//       taskId,
//       projectId,
//     });
//     console.log("works: " + JSON.stringify(workingData));
//     console.log("works1: " + JSON.stringify(listWork));
//     setDropdownTaskActive(false);
//   };

//   const handleCountTime = async () => {
//     console.log("first: " + JSON.stringify(workingData));
//   };
//   // const handleCountTime = async () => {
//   //   const dayAdd = moment().format(FORMAT_DATE);
//   //   if (countTimeActive) {
//   //     const newDataWorkingDone = {
//   //       ...workingData,
//   //     };
//   //     newDataWorkingDone.timeEnd = moment().format(
//   //       `${FORMAT_DATE} ${FORMAT_TIME}`
//   //     );
//   //     newDataWorkingDone.timeStart = moment(
//   //       newDataWorkingDone.timeStart
//   //     ).format(`${FORMAT_DATE} ${FORMAT_TIME}`);
//   //     delete newDataWorkingDone.taskName;
//   //     delete newDataWorkingDone.projectName;
//   //     const workReturnData = await TrackingTimeService.getTrackingTime(
//   //       idUser,
//   //       newDataWorkingDone
//   //     );
//   //     if (dayAdd !== dateCrr) {
//   //       dispatch(setCurrentDate(dayAdd));
//   //     }
//   //     dispatch(addWorkDone(workReturnData));
//   //     clearWorkingData();
//   //     return;
//   //   }
//   //   if (descInput && taskData.taskName) {
//   //     const dataWorkRunning = {
//   //       description: descInput,
//   //       taskId: workingData.taskId,
//   //       projectId: workingData.projectId,
//   //       taskName: taskData.taskName,
//   //       projectName: taskData.projectName,
//   //       timeStart: moment().format(),
//   //       timeEnd: undefined,
//   //     };
//   //     setCountTimeActive(true);
//   //     setWorkingData(dataWorkRunning);
//   //     setWorkRunning(JSON.stringify(dataWorkRunning));
//   //     setTimeStart(
//   //       moment(dataWorkRunning.timeStart).format(FORMAT_TIME).toUpperCase()
//   //     );
//   //   }
//   // };

//   useEffect(() => {
//     if (!countTimeActive) return;
//     const time = convertTime(duration);
//     let { hours, seconds, minutes } = time;

//     let trackingTimeInterval = setInterval(function () {
//       seconds += 1;
//       if (seconds > 59) {
//         seconds = 0;
//         minutes += 1;
//       }
//       if (minutes > 59) {
//         minutes = 0;
//         seconds = 0;
//         hours += 1;
//       }
//       const newHours = `0${hours}`.slice(-2);
//       const newMinutes = `0${minutes}`.slice(-2);
//       const newSeconds = `0${seconds}`.slice(-2);

//       const newTrackingClock = `${newHours}:${newMinutes}:${newSeconds}`;
//       setTrackingClock(newTrackingClock);
//     }, 1000);

//     return () => {
//       clearInterval(trackingTimeInterval);
//     };
//   }, [duration, countTimeActive]);

//   // useEffect(() => {
//   //   const workRunning = JSON.parse(getWorkRunning());
//   //   if (!workRunning) return;
//   //   setDescInput(workRunning.description);
//   //   setTaskData(workRunning);
//   //   setWorkingData(workRunning);
//   //   setCountTimeActive(true);

//   //   const now = moment(moment().format());
//   //   const duration = moment.duration(now.diff(workRunning.timeStart));
//   //   const minutes = duration.asMinutes().toFixed();
//   //   setDuration(minutes);
//   //   setTimeStart(
//   //     moment(workRunning.timeStart).format(FORMAT_TIME).toUpperCase()
//   //   );
//   // }, []);

//   const convertTime = (mins) => {
//     const MINS_PER_HOUR = 60;
//     return {
//       hours: Math.floor(mins / MINS_PER_HOUR),
//       minutes: mins % MINS_PER_HOUR,
//       seconds: 0,
//     };
//   };

//   const clearWorkingData = () => {
//     setCountTimeActive(false);
//     setTrackingClock("00:00:00");
//     setDescInput("");
//     setTaskData(INIT_TASK_DATA);
//     setTimeStart("");
//     setDuration(0);
//     // removeWorkRunning();
//   };

//   useEffect(() => {
//     if (workingDataClick.taskName === "") return;
//     if (countTimeActive) return;
//     // removeWorkRunning();
//     setDescInput(workingDataClick.description);
//     setTaskData({
//       taskName: workingDataClick.taskName,
//       projectName: workingDataClick.projectName,
//       color: workingDataClick.color,
//     });
//     setWorkingData({
//       ...workingData,
//       description: workingDataClick.description,
//       taskId: workingDataClick.taskId,
//       projectId: workingDataClick.projectId,
//     });
//   }, [workingDataClick]);

//   return (
//     <>
//       <div className="tracking-time">
//         <div className="tracking-time-desc">
//           <input
//             placeholder="Description..."
//             className="tracking-time-desc-input"
//             value={descInput}
//             onChange={(event) => setDescInput(event.target.value)}
//             onFocus={() => setDropdownDescActive(true)}
//             onBlur={handleDropdownDescActive}
//           />

//           {dropdownDescActive && (
//             <div
//               className="tracking-time-desc-dropdown"
//               onClick={(event) => event.stopPropagation}
//             >
//               <div className="tracking-time-desc-dropdown-header">
//                 Recent task
//               </div>
//               {listWork.map((work) => (
//                 <DescDropdownItem
//                   key={work.id}
//                   handleClickItemDesc={handleClickItemDesc}
//                   {...work}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//         <div className="tracking-time-task-act">
//           <div
//             className="tracking-time-task-act-input"
//             onClick={() => setDropdownTaskActive(true)}
//           >
//             {taskData.taskName === "" ? (
//               <span>Task</span>
//             ) : (
//               <>
//                 <div
//                   className="tracking-time-task-act-input-color"
//                   style={{ background: taskData.color }}
//                 ></div>
//                 <div className="tracking-time-task-act-input-name">
//                   <div className="tracking-time-task-act-input-name-project">
//                     {taskData.projectName}
//                   </div>
//                   <div className="tracking-time-task-act-input-name-dot"></div>
//                   <div className="tracking-time-task-act-input-name-task">
//                     {taskData.taskName}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//           {dropdownTaskActive && (
//             <div className="tracking-time-task-act-dropdown">
//               <ClickAwayListener
//                 onClickAway={() => {
//                   setDropdownTaskActive(false);
//                 }}
//               >
//                 <Box sx={{ position: "relative" }}>
//                   {projectData.map((project) => (
//                     <TaskDropdownGroup
//                       key={project.id}
//                       color={project.color}
//                       {...project}
//                       handleDropdownTaskChoice={handleDropdownTaskChoice}
//                     />
//                   ))}
//                 </Box>
//               </ClickAwayListener>
//             </div>
//           )}
//         </div>
//         <div className="tracking-time-amount">
//           <div className="tracking-time-amount-start">
//             <span>{timeStart}</span>
//           </div>
//           <div className="tracking-time-amount-time">
//             <span>{trackingClock}</span>
//           </div>
//           <div
//             className={`tracking-time-amount-btn-start ${
//               countTimeActive && "active"
//             }`}
//             onClick={handleCountTime}
//           >
//             {countTimeActive ? (
//               <StopIcon sx={{ fontSize: 28, color: "white" }} />
//             ) : (
//               <PlayArrowIcon sx={{ fontSize: 28, color: "white" }} />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TrackingTime;

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Box, ClickAwayListener } from "@mui/material";
import { FORMAT_DATE, FORMAT_TIME } from "../../constants/common";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDate } from "../../redux/slices/varSlice";
import { addWorkDone } from "../../redux/slices/workByDaySlice";
import {
  getWorkRunning,
  removeWorkRunning,
  setWorkRunning,
} from "../../services/localStorage";
import DescDropdownItem from "../DescDropdownItem";
import TaskDropdownGroup from "../TaskDropdownGroup";
import "./index.scss";
import { timeEntryApi } from "../../api/time_entry/time_entry.api";

const INIT_TASK_DATA = {
  projectTaskName: "",
  projectName: "",
  color: "",
};

const TrackingTime = ({ listWork, projectData, idUser, workingDataClick }) => {
  const [descInput, setDescInput] = useState("");
  const [taskData, setTaskData] = useState(INIT_TASK_DATA);
  const [dropdownDescActive, setDropdownDescActive] = useState(false);
  const [dropdownTaskActive, setDropdownTaskActive] = useState(false);
  const [countTimeActive, setCountTimeActive] = useState(false);
  const [duration, setDuration] = useState(0);
  const [trackingClock, setTrackingClock] = useState("00:00:00");
  const [workingData, setWorkingData] = useState({
    description: "",
    projectTaskId: "",
    projectId: "",
    timeStart: undefined,
    timeEnd: undefined,
  });
  const [timeStart, setTimeStart] = useState("");
  const dispatch = useDispatch();
  const dateCrr = useSelector((state) => state.vars.currentDate);

  const handleClickItemDesc = ({
    description,
    projectTaskName,
    projectName,
    projectTaskId,
    projectId,
    color,
  }) => {
    clearWorkingData();
    setDescInput(description);
    setTaskData({
      projectTaskName,
      projectName,
      color,
    });
    setWorkingData({
      ...workingData,
      description,
      projectTaskId,
      projectId,
    });
  };

  const handleDropdownDescActive = () => {
    setTimeout(() => {
      setDropdownDescActive(false);
    }, 150);
  };

  const handleDropdownTaskChoice = ({
    projectTaskName,
    projectName,
    projectTaskId,
    projectId,
    color,
  }) => {
    if (countTimeActive) clearWorkingData();

    setTaskData({
      projectTaskName,
      projectName,
      color,
    });
    setWorkingData({
      ...workingData,
      projectTaskId,
      projectId,
    });
    setDropdownTaskActive(false);
  };

  const handleCountTime = async () => {
    const dayAdd = moment().format(FORMAT_DATE);
    if (countTimeActive) {
      const newDataWorkingDone = {
        ...workingData,
      };
      newDataWorkingDone.timeEnd = moment().format(
        `${FORMAT_DATE} ${FORMAT_TIME}`
      );
      newDataWorkingDone.timeStart = moment(
        newDataWorkingDone.timeStart
      ).format(`${FORMAT_DATE} ${FORMAT_TIME}`);
      delete newDataWorkingDone.projectTaskName;
      delete newDataWorkingDone.projectName;
      const res = await timeEntryApi.addTimeEntry({
        ...newDataWorkingDone,
        userId: idUser,
      });
      const workReturnData = res.data.resultObj;
      if (dayAdd !== dateCrr) {
        dispatch(setCurrentDate(dayAdd));
      }
      dispatch(addWorkDone(workReturnData));
      clearWorkingData();
      return;
    }
    if (descInput && taskData.projectTaskName) {
      const dataWorkRunning = {
        description: descInput,
        projectTaskId: workingData.projectTaskId,
        projectId: workingData.projectId,
        projectTaskName: taskData.projectTaskName,
        projectName: taskData.projectName,
        timeStart: moment().format(),
        timeEnd: undefined,
      };
      setCountTimeActive(true);
      setWorkingData(dataWorkRunning);
      setWorkRunning(JSON.stringify(dataWorkRunning));
      setTimeStart(
        moment(dataWorkRunning.timeStart).format(FORMAT_TIME).toUpperCase()
      );
    }
  };

  useEffect(() => {
    if (!countTimeActive) return;
    const time = convertTime(duration);
    let { hours, seconds, minutes } = time;

    let trackingTimeInterval = setInterval(function () {
      seconds += 1;
      if (seconds > 59) {
        seconds = 0;
        minutes += 1;
      }
      if (minutes > 59) {
        minutes = 0;
        seconds = 0;
        hours += 1;
      }
      const newHours = `0${hours}`.slice(-2);
      const newMinutes = `0${minutes}`.slice(-2);
      const newSeconds = `0${seconds}`.slice(-2);

      const newTrackingClock = `${newHours}:${newMinutes}:${newSeconds}`;
      setTrackingClock(newTrackingClock);
    }, 1000);

    return () => {
      clearInterval(trackingTimeInterval);
    };
  }, [duration, countTimeActive]);

  useEffect(() => {
    const workRunning = JSON.parse(getWorkRunning());
    if (!workRunning) return;
    setDescInput(workRunning.description);
    setTaskData(workRunning);
    setWorkingData(workRunning);
    setCountTimeActive(true);

    const now = moment(moment().format());
    const duration = moment.duration(now.diff(workRunning.timeStart));
    const minutes = duration.asMinutes().toFixed();
    setDuration(minutes);
    setTimeStart(
      moment(workRunning.timeStart).format(FORMAT_TIME).toUpperCase()
    );
  }, []);

  const convertTime = (mins) => {
    const MINS_PER_HOUR = 60;
    return {
      hours: Math.floor(mins / MINS_PER_HOUR),
      minutes: mins % MINS_PER_HOUR,
      seconds: 0,
    };
  };

  const clearWorkingData = () => {
    setCountTimeActive(false);
    setTrackingClock("00:00:00");
    setDescInput("");
    setTaskData(INIT_TASK_DATA);
    setTimeStart("");
    setDuration(0);
    removeWorkRunning();
  };

  useEffect(() => {
    if (workingDataClick.projectTaskName === "") return;
    if (countTimeActive) return;
    removeWorkRunning();
    setDescInput(workingDataClick.description);
    setTaskData({
      projectTaskName: workingDataClick.projectTaskName,
      projectName: workingDataClick.projectName,
      color: workingDataClick.color,
    });
    setWorkingData({
      ...workingData,
      description: workingDataClick.description,
      projectTaskId: workingDataClick.projectTaskId,
      projectId: workingDataClick.projectId,
    });
  }, [workingDataClick]);

  return (
    <>
      <div className="tracking-time">
        <div className="tracking-time-desc">
          <input
            placeholder="Description..."
            className="tracking-time-desc-input"
            value={descInput}
            onChange={(event) => setDescInput(event.target.value)}
            onFocus={() => setDropdownDescActive(true)}
            onBlur={handleDropdownDescActive}
          />

          {dropdownDescActive && (
            <div
              className="tracking-time-desc-dropdown"
              onClick={(event) => event.stopPropagation}
            >
              <div className="tracking-time-desc-dropdown-header">
                Recent task
              </div>
              {listWork.map((work) => (
                <DescDropdownItem
                  key={work.id}
                  handleClickItemDesc={handleClickItemDesc}
                  {...work}
                />
              ))}
            </div>
          )}
        </div>
        <div className="tracking-time-task-act">
          <div
            className="tracking-time-task-act-input"
            onClick={() => setDropdownTaskActive(true)}
          >
            {taskData.projectTaskName === "" ? (
              <span>Task</span>
            ) : (
              <>
                <div
                  className="tracking-time-task-act-input-color"
                  style={{ background: taskData.color }}
                ></div>
                <div className="tracking-time-task-act-input-name">
                  <div className="tracking-time-task-act-input-name-project">
                    {taskData.projectName}
                  </div>
                  <div className="tracking-time-task-act-input-name-dot"></div>
                  <div className="tracking-time-task-act-input-name-task">
                    {taskData.projectTaskName}
                  </div>
                </div>
              </>
            )}
          </div>
          {dropdownTaskActive && (
            <div className="tracking-time-task-act-dropdown">
              <ClickAwayListener
                onClickAway={() => {
                  setDropdownTaskActive(false);
                }}
              >
                <Box sx={{ position: "relative" }}>
                  {projectData.map((project) => (
                    <TaskDropdownGroup
                      key={project.id}
                      color={project.color}
                      {...project}
                      handleDropdownTaskChoice={handleDropdownTaskChoice}
                    />
                  ))}
                </Box>
              </ClickAwayListener>
            </div>
          )}
        </div>
        <div className="tracking-time-amount">
          <div className="tracking-time-amount-start">
            <span>{timeStart}</span>
          </div>
          <div className="tracking-time-amount-time">
            <span>{trackingClock}</span>
          </div>
          <div
            className={`tracking-time-amount-btn-start ${
              countTimeActive && "active"
            }`}
            onClick={handleCountTime}
          >
            {countTimeActive ? (
              <StopIcon sx={{ fontSize: 28, color: "white" }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: 28, color: "white" }} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingTime;
