// import React from "react";
// import TrackingTime from "../../components/TrackingTime";
// import { withHeaderHOC } from "../../components/Header/withHeaderHOC";
// import ListProject from "./ListProject";
// import ListWorkingDuration from "./ListWorkingDuration/index";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import jwtDecode from "jwt-decode";
// import { getWorkingProject } from "../../redux/action/projectAction";
// import {
//   getTimeEntriesByDate,
//   getUserTimeEntry,
// } from "../../redux/action/timeEntryAction";
// import { setWorkingLoading } from "../../redux/slices/loadingSlice";
// // import { getWorkingProject } from "../project/action";

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const projectState = useSelector((state) => state.project);
//   const timeEntryState = useSelector((state) => state.time_entry);
//   const [projectData, setProjectData] = useState([]);
//   // const projectData = [
//   //   {
//   //     client: "Thuy",
//   //     color: "#9c27b0",
//   //     // done: false,
//   //     id: 123,
//   //     projectTasks: {
//   //       id: 12,
//   //       taskName: "task 1",
//   //     },
//   //     projectName: "Search2.0",
//   //   },
//   //   {
//   //     client: "Huy",
//   //     color: "#9c27b0",
//   //     // done: false,
//   //     id: 124,
//   //     projectTasks: {
//   //       id: 13,
//   //       taskName: "task 1",
//   //     },
//   //     projectName: "Calculator",
//   //   },
//   // ];
//   // const [listWork, setListWork] = useState([
//   //   {
//   //     color: "#9c27b0",
//   //     description: "cvcv",
//   //     id: 1047,
//   //     projectId: 113,
//   //     projectName: "alo",
//   //     taskId: 236,
//   //     taskName: "Ủa alo",
//   //   },
//   //   {
//   //     color: "#9c27b0",
//   //     description: "cvcv",
//   //     id: 1048,
//   //     projectId: 113,
//   //     projectName: "alo",
//   //     taskId: 237,
//   //     taskName: "Ủa alo df",
//   //   },
//   // ]);

//   const convertTimeWorkingDuration = (stringTime) => {
//     const arrayString = stringTime.split(" ");
//     const time = arrayString[1];
//     const AMorPM = arrayString[2];
//     return `${time} ${AMorPM}`;
//   };

//   const listWorkByDay = timeEntryState.timeEntries.map((item) => {
//     return {
//       ...item,
//       timeStart: convertTimeWorkingDuration(item.timeStart),
//       timeEnd: convertTimeWorkingDuration(item.timeEnd),
//     };
//   });
//   // const idUser = useSelector((state) => state.auth.id);
//   const idUser = jwtDecode(localStorage.getItem("token")).id;
//   // const datePicked = useSelector((state) => state.vars.currentDate);
//   const [workingDataClick, setWorkingDataClick] = useState({
//     description: "",
//     projectTaskName: "",
//     projectName: "",
//     projectTaskId: "",
//     projectId: "",
//     color: "",
//   });

//   // useEffect(() => {
//   //   const filterDataProject = (data, needTimeStamps) => {
//   //     const newListWork = data.map((work) => {
//   //       const projectWithId = findDataById(work.projectId, projectData);
//   //       const listTaskWithProject = projectWithId?.list_task;
//   //       const taskWithId = findDataById(work.taskId, listTaskWithProject);
//   //       if (!needTimeStamps) {
//   //         return {
//   //           ...work,
//   //           projectName: projectWithId?.name,
//   //           taskName: taskWithId?.name,
//   //           color: projectWithId?.color,
//   //         };
//   //       }
//   //       return {
//   //         ...work,
//   //         projectName: projectWithId?.name,
//   //         taskName: taskWithId?.name,
//   //         color: projectWithId?.color,
//   //         timeStart: convertTimeWorkingDuration(work.timeStart),
//   //         timeEnd: convertTimeWorkingDuration(work.timeEnd),
//   //       };
//   //     });
//   //     return newListWork;
//   //   };

//   //   // get name task and name project with id
//   //   const newListWorkNoTime = filterDataProject(workingDurationData, false);
//   //   const newListWorkHaveTime = filterDataProject(
//   //     workingDurationByDayData,
//   //     true
//   //   );
//   //   setListWorkByDay(newListWorkHaveTime);
//   //   setListWork(newListWorkNoTime);
//   // }, [workingDurationData, workingDurationByDayData, projectData]);

//   const findDataById = (id, data) => {
//     return data && data.find((item) => item.id === id);
//   };

//   useEffect(() => {
//     const getData = async () => {
//       await dispatch(getWorkingProject());
//       dispatch(getUserTimeEntry());
//     };
//     getData();
//     dispatch(setWorkingLoading(false));
//     // setProjectData(projectState.workingProjects);
//   }, [projectData]);
//   return (
//     <div
//       style={{
//         backgroundColor: "#f2f5f7",
//         paddingBottom: "180px",
//         minHeight: "100vh",
//       }}
//     >
//       <TrackingTime
//         listWork={timeEntryState.userTimeEntry}
//         projectData={projectState.workingProjects}
//         // projectData={projectData}
//         idUser={idUser}
//         workingDataClick={workingDataClick}
//       />
//       <ListProject
//         projectData={projectState.workingProjects}
//         // projectData={projectData}
//         handleClickWorking={(work) => setWorkingDataClick(work)}
//       />
//       <ListWorkingDuration
//         listWorkByDay={listWorkByDay}
//         listWork={projectState.userTimeEntry}
//         projectData={projectState.workingProjects}
//         // projectData={projectData}
//         handleClickWorking={(work) => setWorkingDataClick(work)}
//       />
//     </div>
//   );
// };

// export default withHeaderHOC(HomePage);

import React from "react";
import TrackingTime from "../../components/TrackingTime";
import { withHeaderHOC } from "../../components/Header/withHeaderHOC";
import ListProject from "./ListProject";
import ListWorkingDuration from "./ListWorkingDuration/index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
// import { getWorkingProject } from "../../redux/action/projectAction";
// import {
//   getTimeEntriesByDate,
//   getUserTimeEntry,
// } from "../../redux/action/timeEntryAction";
import { setWorkingLoading } from "../../redux/slices/loadingSlice";
import {
  selectProjects,
  setProjects,
} from "../../redux/slices/projectTrackTimeSlice";
import { setWorkByDay } from "../../redux/slices/workByDaySlice";
import { setWorks } from "../../redux/slices/workSlice";
import { projectApi } from "../../api/project/project.api";
import { timeEntryApi } from "../../api/time_entry/time_entry.api";

const Home = () => {
  const projectData = useSelector(selectProjects);
  const workingDurationData = useSelector((state) => state.works);
  const workingDurationByDayData = useSelector((state) => state.workByDay);
  const [listWork, setListWork] = useState([]);
  const [listWorkByDay, setListWorkByDay] = useState([]);
  const token = localStorage.getItem("token");
  const idUser = token ? jwtDecode(token).id : "";
  const datePicked = useSelector((state) => state.vars.currentDate);
  const [workingDataClick, setWorkingDataClick] = useState({
    description: "",
    taskName: "",
    projectName: "",
    projectTaskId: "",
    projectId: "",
    color: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const projectsRes = await projectApi.getWorkingProject(idUser);
      const projects = projectsRes.data.resultObj;
      const workingDurationsRes = await timeEntryApi.getUserTimeEntry(idUser);
      const workingDurations = workingDurationsRes.data.resultObj;
      const workingDurationByDayRes = await timeEntryApi.getTimeEntriesByDate(
        idUser,
        datePicked
      );
      const workingDurationByDay = workingDurationByDayRes.data.resultObj;
      dispatch(setProjects(projects));
      dispatch(setWorks(workingDurations));
      dispatch(setWorkByDay(workingDurationByDay));
      dispatch(setWorkingLoading(false));
    };
    fetchData();
  }, [idUser, dispatch, datePicked]);

  useEffect(() => {
    const filterDataProject = (data, needTimeStamps) => {
      const newListWork = data.map((work) => {
        const projectWithId = findDataById(work.projectId, projectData);
        const listTaskWithProject = projectWithId?.projectTasks;
        const taskWithId = findDataById(
          work.projectTaskId,
          listTaskWithProject
        );
        if (!needTimeStamps) {
          return {
            ...work,
            projectName: projectWithId?.projectName,
            taskName: taskWithId?.taskName,
            color: projectWithId?.color,
          };
        }
        return {
          ...work,
          projectName: projectWithId?.projectName,
          taskName: taskWithId?.taskName,
          color: projectWithId?.color,
          timeStart: convertTimeWorkingDuration(work.timeStart),
          timeEnd: convertTimeWorkingDuration(work.timeEnd),
        };
      });
      return newListWork;
    };

    // get name task and name project with id
    const newListWorkNoTime = filterDataProject(workingDurationData, false);
    const newListWorkHaveTime = filterDataProject(
      workingDurationByDayData,
      true
    );
    setListWorkByDay(newListWorkHaveTime);
    setListWork(newListWorkNoTime);
  }, [workingDurationData, workingDurationByDayData, projectData]);

  const convertTimeWorkingDuration = (stringTime) => {
    if (stringTime) {
      const arrayString = stringTime.split(" ");
      const time = arrayString[1];
      const AMorPM = arrayString[2];
      return `${time} ${AMorPM}`;
    }
  };

  const findDataById = (id, data, num) => {
    return data && data.find((item) => item.id === id);
  };

  return (
    <div
      style={{
        backgroundColor: "#f2f5f7",
        paddingBottom: "180px",
        minHeight: "100vh",
      }}
    >
      <TrackingTime
        listWork={listWork}
        projectData={projectData}
        idUser={idUser}
        workingDataClick={workingDataClick}
      />
      <ListProject
        projectData={projectData}
        handleClickWorking={(work) => setWorkingDataClick(work)}
      />
      <ListWorkingDuration
        listWorkByDay={listWorkByDay}
        listWork={listWork}
        projectData={projectData}
        handleClickWorking={(work) => setWorkingDataClick(work)}
      />
    </div>
  );
};

export default withHeaderHOC(Home);
