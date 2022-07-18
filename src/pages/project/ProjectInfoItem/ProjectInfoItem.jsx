// import { ExclamationCircleOutlined } from "@ant-design/icons";
// import { Archive, Unarchive } from "@mui/icons-material";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { Avatar, AvatarGroup } from "@mui/material";
// import { Modal } from "antd";
// import { PAGE_URLS } from "../../../constants/common";
// import * as _ from "lodash";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Notification from "../../../components/Form/Notification";
// import "./ProjectInfoItem.scss";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   archiveAProject,
//   getPMProjectDetail,
//   unarchiveAProject,
// } from "../../../redux/action/projectAction";
// import { setProjectEdit } from "../../../redux/slices/projectEditSlice";
// const { confirm } = Modal;
// const ProjectInfoItem = () => {
//   const dispatch = useDispatch();
//   const projectState = useSelector((state) => state.project);
//   const params = useParams();
//   const { projectitemId } = params;
//   const navigate = useNavigate();
//   const pmProjects = useSelector((state) => state.project.pmProjects);

//   const [pmProjectDetail, setPmProjectDetail] = useState(
//     projectState.pmProjectDetail
//   );
//   const [notify, setNotify] = useState({});
//   const [dataTask, setdataTask] = useState([]);
//   const [dataTeam, setdataTeam] = useState([]);

//   useEffect(() => {
//     (async () => {
//       await dispatch(getPMProjectDetail(projectitemId));
//       // setPmProjectDetail(projectState.pmProjectDetail);
//     })();
//   }, [projectitemId]);

//   useEffect(() => {
//     if (!_.isEmpty(projectState.pmProjectDetail)) {
//       const { projectTasks = [], users = [] } = projectState.pmProjectDetail;
//       const mappedListTask = projectTasks.map((item) => ({
//         ...item,
//         isSelected: false,
//       }));
//       setdataTask(mappedListTask);

//       const mappedListUser = users.map((item) => ({
//         ...item,
//         isSelecteds: false,
//       }));
//       setdataTeam(mappedListUser);
//     }
//   }, [projectState.pmProjectDetail]);

//   const [isTaskActive, setisTaskActive] = useState(true);
//   const [isTeamActive, setisTeamActive] = useState(false);
//   var task = document.querySelector(".project-link-task");
//   var team = document.querySelector(".project-link-team");
//   const hancleChangeTask = () => {
//     setisTaskActive(true);
//     setisTeamActive(false);
//     task.style.borderBottom = "2px solid";
//     task.style.borderBottomColor = "#0066cc";
//     team.style.borderBottom = "";
//     team.style.borderBottomColor = "";
//     team.style.opacity = "0.5";
//     task.style.opacity = "1";
//   };
//   const hancleChangeTeam = () => {
//     setisTaskActive(false);
//     setisTeamActive(true);
//     team.style.borderBottom = "2px solid";
//     team.style.borderBottomColor = "#0066cc";
//     task.style.borderBottom = "";
//     task.style.borderBottomColor = "";
//     task.style.opacity = "0.5";
//     team.style.opacity = "1";
//   };
//   const deleteProjects = async (event, id) => {};
//   // const deleteProjects = async (event, id) => {
//   //   event.preventDefault();

//   //   confirm({
//   //     centered: true,
//   //     title: "Delete Project",
//   //     icon: <ExclamationCircleOutlined />,
//   //     content: "Are you sure you want to delete this project?",
//   //     async onOk() {
//   //       const deleteRes = await ProjectService.deleteProject(userId, id);
//   //       if (!deleteRes) return;
//   //       dispatch(deleteProject(id));
//   //       setNotify({
//   //         isOpen: true,
//   //         message: "Deleted Successfully",
//   //         type: "success",
//   //       });
//   //       setTimeout(() => {
//   //         navigate(PAGE_URLS.PROJECTS);
//   //       }, [3000]);
//   //     },
//   //     onCancel() {},
//   //   });
//   // };
//   // const handleProjectEdit = async (event, id) => {};
//   const handleProjectEdit = async (event, id) => {
//     navigate(`${PAGE_URLS.PROJECTS}${PAGE_URLS.EDITPROJECT}/${id}`);
//   };
//   // const handleArchive = (id) => {};
//   const handleArchive = (projectId) => {
//     confirm({
//       centered: true,
//       title: "Archive Project",
//       icon: <ExclamationCircleOutlined />,
//       content: "Are you sure you want to archive this project?",
//       async onOk() {
//         // await ProjectService.getProjectArchive(userId, id);
//         // (async () => {
//         //   const projectDetail = await ProjectService.getProjectDetail(
//         //     userId,
//         //     id
//         //   );
//         //   setData(projectDetail);
//         // })();
//         await dispatch(archiveAProject(projectId));
//         dispatch(getPMProjectDetail(projectId));
//         // setPmProjectDetail(projectState.pmProjectDetail);
//         setNotify({
//           isOpen: true,
//           message: "Archive Successfully",
//           type: "success",
//         });
//       },
//       onCancel() {},
//     });
//   };

//   // const handleUnArchive = (id) => {};
//   const handleUnArchive = (projectId) => {
//     confirm({
//       centered: true,
//       title: "UnArchive Project",
//       icon: <ExclamationCircleOutlined />,
//       content: "Are you sure you want to unarchive this project?",
//       async onOk() {
//         await dispatch(unarchiveAProject(projectId));
//         dispatch(getPMProjectDetail(projectId));
//         setNotify({
//           isOpen: true,
//           message: "UnArchive Successfully",
//           type: "success",
//         });
//       },
//       onCancel() {},
//     });
//   };

//   useEffect(() => {}, []);

//   return (
//     <div className="project">
//       <div className="project-header">
//         <div className="project-header-title">
//           <p
//             className="project-header-title-color"
//             style={{ backgroundColor: projectState.pmProjectDetail.color }}
//           ></p>
//           <div className="project-header-title-info">
//             <h5 className="project-header-title-info-client">
//               {projectState.pmProjectDetail.client}
//             </h5>
//             <h1 className="project-header-title-info-name">
//               {projectState.pmProjectDetail.projectName}
//             </h1>
//             <h5 className="project-header-title-info-tracked">
//               {projectState.pmProjectDetail.trackedTime} hours tracked
//             </h5>
//           </div>
//         </div>
//         <div className="project-header-icon">
//           {projectState.pmProjectDetail.isDone ? (
//             <button
//               onClick={() => handleUnArchive(projectState.pmProjectDetail.id)}
//               className="project-table-row-content-5-icon-pro"
//             >
//               <Unarchive
//                 sx={{
//                   height: "16px",
//                   width: "16px",
//                   color: "rgba(54, 54, 54, 0.7)",
//                 }}
//               ></Unarchive>
//             </button>
//           ) : (
//             <button
//               onClick={() => handleArchive(projectState.pmProjectDetail.id)}
//               className="project-table-row-content-5-icon-pro"
//             >
//               <Archive
//                 sx={{
//                   height: "16px",
//                   width: "16px",
//                   color: "rgba(54, 54, 54, 0.7)",
//                 }}
//               ></Archive>
//             </button>
//           )}
//           <button
//             className="project-header-icon-pro"
//             onClick={(e) => deleteProjects(e, projectState.pmProjectDetail.id)}
//           >
//             <DeleteIcon
//               sx={{
//                 height: "16px",
//                 width: "16px",
//                 color: "rgba(54, 54, 54, 0.7)",
//               }}
//             ></DeleteIcon>
//           </button>
//           {!projectState.pmProjectDetail.isDone && (
//             <button
//               className="project-header-icon-pro"
//               onClick={(event) =>
//                 handleProjectEdit(event, projectState.pmProjectDetail.id)
//               }
//             >
//               <EditIcon
//                 sx={{
//                   height: "16px",
//                   width: "16px",
//                   color: "rgba(54, 54, 54, 0.7)",
//                 }}
//               ></EditIcon>
//             </button>
//           )}
//         </div>
//       </div>
//       <div className="project-link">
//         <button className="project-link-task" onClick={hancleChangeTask}>
//           Task
//         </button>
//         <button className="project-link-team" onClick={hancleChangeTeam}>
//           Team
//         </button>
//         <div
//           className="project-link-status"
//           style={{ display: "flex", float: "right" }}
//         >
//           <div className="project-link-status-title">Status:</div>
//           {projectState.pmProjectDetail.isDone ? (
//             <div className="project-link-status-archive">Archive</div>
//           ) : (
//             <div className="project-link-status-unarchive">Active</div>
//           )}
//         </div>
//       </div>
//       <div className="project-table">
//         {isTaskActive && (
//           <table className="project-table-row" key={0}>
//             <tbody>
//               <tr className="project-table-row-title">
//                 <th className="project-table-row-title-task">Task</th>
//                 <th className="project-table-row-title-track">Tracked (h)</th>
//               </tr>

//               {dataTask.map((task, index) => (
//                 // <>
//                 <tr className="project-table-row-content" key={index}>
//                   <td
//                     className="project-table-row-content-task"
//                     style={{ padding: "12px 0px 8px 0px" }}
//                   >
//                     <div className="project-table-row-content-task-link">
//                       {task.isSelected ? (
//                         <RemoveIcon
//                           onClick={() => {
//                             setdataTask(
//                               dataTask.map((d) => {
//                                 if (d.id === task.id) {
//                                   d.isSelected = false;
//                                 }
//                                 return d;
//                               })
//                             );
//                           }}
//                           sx={{
//                             marginTop: "5px",
//                             marginRight: "9px",
//                             height: "16px",
//                             width: "16px",
//                             backgroundColor: "rgba(255,255,255,0)",
//                             cursor: "pointer",
//                           }}
//                         ></RemoveIcon>
//                       ) : (
//                         <AddIcon
//                           onClick={() => {
//                             setdataTask(
//                               dataTask.map((d) => {
//                                 if (d.id === task.id) {
//                                   d.isSelected = true;
//                                 }
//                                 return d;
//                               })
//                             );
//                           }}
//                           sx={{
//                             marginTop: "5px",
//                             marginRight: "9px",
//                             height: "16px",
//                             width: "16px",
//                             backgroundColor: "rgba(255,255,255,0)",
//                             cursor: "pointer",
//                           }}
//                         ></AddIcon>
//                       )}

//                       <button className="project-table-row-content-task-link-btn">
//                         {task.taskName}
//                       </button>
//                     </div>
//                     <div className="project-table-row-content-task-user">
//                       {task.isSelected ? (
//                         <>
//                           {task.users.map((d, index) => (
//                             <div className="project-table-row-content-task-user-item">
//                               <Avatar
//                                 sx={{
//                                   marginRight: "16px",
//                                   width: "35px",
//                                   height: "35px",
//                                 }}
//                                 alt={d.userName}
//                                 src={d.avatarUrl}
//                                 key={index}
//                               />
//                               <p className="project-table-row-content-task-user-item-name">
//                                 {d.userName}
//                               </p>
//                             </div>
//                           ))}
//                         </>
//                       ) : (
//                         <AvatarGroup max={4} style={{ float: "left" }}>
//                           {task.users.map((d, index) => (
//                             <Avatar
//                               sx={{
//                                 marginRight: "16px",
//                               }}
//                               alt={d.userName}
//                               src={d.avatarUrl}
//                               key={index}
//                             />
//                           ))}
//                         </AvatarGroup>
//                       )}
//                     </div>
//                   </td>
//                   <td className="project-table-row-content-track">
//                     {task.trackedTime}
//                   </td>
//                 </tr>
//                 // </>
//               ))}
//             </tbody>
//           </table>
//         )}
//         {isTeamActive && (
//           <table className="project-table-row" key={1}>
//             <tbody>
//               <tr className="project-table-row-title">
//                 <th className="project-table-row-title-task">Member</th>
//                 <th className="project-table-row-title-track">Tracked (h)</th>
//               </tr>
//               {dataTeam.map((team, index) => (
//                 <>
//                   <tr className="project-table-row-content" key={index}>
//                     <td
//                       className="project-table-row-content-task"
//                       style={{ padding: "12px 0px 8px 0px" }}
//                     >
//                       <div className="project-table-row-content-task-link">
//                         {team.isSelecteds ? (
//                           <RemoveIcon
//                             onClick={() => {
//                               setdataTeam(
//                                 dataTeam.map((d) => {
//                                   if (d.userId === team.userId) {
//                                     d.isSelecteds = false;
//                                   }
//                                   return d;
//                                 })
//                               );
//                             }}
//                             sx={{
//                               height: "16px",
//                               width: "16px",
//                               marginTop: "9px",
//                               backgroundColor: "rgba(255,255,255,0)",
//                             }}
//                           ></RemoveIcon>
//                         ) : (
//                           <AddIcon
//                             onClick={() => {
//                               setdataTeam(
//                                 dataTeam.map((d) => {
//                                   if (d.userId === team.userId) {
//                                     d.isSelecteds = true;
//                                   }
//                                   return d;
//                                 })
//                               );
//                             }}
//                             sx={{
//                               height: "16px",
//                               width: "16px",
//                               marginTop: "9px",
//                               backgroundColor: "rgba(255,255,255,0)",
//                             }}
//                           ></AddIcon>
//                         )}
//                         <Avatar
//                           sx={{
//                             margin: "0px 10px",
//                             width: "35px",
//                             height: "35px",
//                           }}
//                           alt={team.userName}
//                           src={team.avatarUrl}
//                         />
//                         <button className="project-table-row-content-task-link-btn">
//                           {team.userName}
//                         </button>
//                         {team.pm && (
//                           <span className="project-table-row-content-task-link-pm ">
//                             PM
//                           </span>
//                         )}
//                       </div>
//                       <div className="project-table-row-content-task-total">
//                         {team.isSelecteds ? (
//                           <>
//                             {team.listTask.map((n, index) => (
//                               <p key={index}>{n.name}</p>
//                             ))}
//                           </>
//                         ) : (
//                           <>{team.totalTask} tasks</>
//                         )}
//                       </div>
//                     </td>
//                     <td className="project-table-row-content-track">
//                       {team.trackedTime}
//                     </td>
//                   </tr>
//                 </>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <Notification notify={notify} setNotify={setNotify}></Notification>
//     </div>
//   );
// };

// export default ProjectInfoItem;

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Archive, Unarchive } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import { Avatar, AvatarGroup } from "@mui/material";
import { Modal } from "antd";
import { PAGE_URLS } from "../../../constants/common";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProject } from "../../../redux/slices/projectSlice";
import Notification from "../../../components/Form/Notification";
import "./ProjectInfoItem.scss";
import jwtDecode from "jwt-decode";
import { projectApi } from "../../../api/project/project.api";
const { confirm } = Modal;
const ProjectInfoItem = () => {
  const params = useParams();
  const { projectitemId } = params;
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notify, setNotify] = useState({});
  const [dataTask, setdataTask] = useState([]);
  const [dataTeam, setdataTeam] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await projectApi.getPMProjectDetail(userId, projectitemId);
      const projectDetail = res.data.resultObj;
      debugger;
      setData(projectDetail);
    })();
  }, [projectitemId]);

  useEffect(() => {
    if (!_.isEmpty(data)) {
      const { projectTasks = [], users = [] } = data;
      const mappedListTask = projectTasks.map((item) => ({
        ...item,
        isSelected: false,
      }));
      setdataTask(mappedListTask);

      const mappedListUser = users.map((item) => ({
        ...item,
        isSelecteds: false,
      }));
      setdataTeam(mappedListUser);
    }
  }, [data]);

  const [isTaskActive, setisTaskActive] = useState(true);
  const [isTeamActive, setisTeamActive] = useState(false);
  var task = document.querySelector(".project-link-task");
  var team = document.querySelector(".project-link-team");
  const hancleChangeTask = () => {
    setisTaskActive(true);
    setisTeamActive(false);
    task.style.borderBottom = "2px solid";
    task.style.borderBottomColor = "#0066cc";
    team.style.borderBottom = "";
    team.style.borderBottomColor = "";
    team.style.opacity = "0.5";
    task.style.opacity = "1";
  };
  const hancleChangeTeam = () => {
    setisTaskActive(false);
    setisTeamActive(true);
    team.style.borderBottom = "2px solid";
    team.style.borderBottomColor = "#0066cc";
    task.style.borderBottom = "";
    task.style.borderBottomColor = "";
    task.style.opacity = "0.5";
    team.style.opacity = "1";
  };
  const deleteProjects = async (event, id) => {
    event.preventDefault();

    confirm({
      centered: true,
      title: "Delete Project",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete this project?",
      async onOk() {
        const deleteRes = await projectApi.deleteProject(userId, id);
        if (!deleteRes) return;
        dispatch(deleteProject(id));
        setNotify({
          isOpen: true,
          message: "Deleted Successfully",
          type: "success",
        });
        setTimeout(() => {
          navigate(PAGE_URLS.PROJECTS);
        }, [3000]);
      },
      onCancel() {},
    });
  };
  const handleProjectEdit = async (event, id) => {
    navigate(`${PAGE_URLS.PROJECTS}${PAGE_URLS.EDITPROJECT}/${id}`);
  };
  const handleArchive = (id) => {
    confirm({
      centered: true,
      title: "Archive Project",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to archive this project?",
      async onOk() {
        await projectApi.archiveAProject(userId, id);
        (async () => {
          const res = await projectApi.getPMProjectDetail(userId, id);
          const projectDetail = res.data.resultObj;
          setData(projectDetail);
        })();
        setNotify({
          isOpen: true,
          message: "Archive Successfully",
          type: "success",
        });
      },
      onCancel() {},
    });
  };
  const handleUnArchive = (id) => {
    confirm({
      centered: true,
      title: "UnArchive Project",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to unarchive this project?",
      async onOk() {
        await projectApi.unarchiveAProject(userId, id);
        (async () => {
          const res = await projectApi.getPMProjectDetail(
            userId,
            projectitemId
          );
          const projectDetail = res.data.resultObj;
          setData(projectDetail);
        })();
        setNotify({
          isOpen: true,
          message: "UnArchive Successfully",
          type: "success",
        });
      },
      onCancel() {},
    });
  };

  return (
    <div className="project">
      <div className="project-header">
        <div className="project-header-title">
          <p
            className="project-header-title-color"
            style={{ backgroundColor: data.color }}
          ></p>
          <div className="project-header-title-info">
            <h5 className="project-header-title-info-client">{data.client}</h5>
            <h1 className="project-header-title-info-name">
              {data.projectName}
            </h1>
            <h5 className="project-header-title-info-tracked">
              {data.trackedTime} hours tracked
            </h5>
          </div>
        </div>
        <div className="project-header-icon">
          {data.isDone ? (
            <button
              onClick={() => handleUnArchive(data.id)}
              className="project-table-row-content-5-icon-pro"
            >
              <Unarchive
                sx={{
                  height: "16px",
                  width: "16px",
                  color: "rgba(54, 54, 54, 0.7)",
                }}
              ></Unarchive>
            </button>
          ) : (
            <button
              onClick={() => handleArchive(data.id)}
              className="project-table-row-content-5-icon-pro"
            >
              <Archive
                sx={{
                  height: "16px",
                  width: "16px",
                  color: "rgba(54, 54, 54, 0.7)",
                }}
              ></Archive>
            </button>
          )}
          <button
            className="project-header-icon-pro"
            onClick={(e) => deleteProjects(e, data.id)}
          >
            <DeleteIcon
              sx={{
                height: "16px",
                width: "16px",
                color: "rgba(54, 54, 54, 0.7)",
              }}
            ></DeleteIcon>
          </button>
          {!data.isDone && (
            <button
              className="project-header-icon-pro"
              onClick={(event) => handleProjectEdit(event, data.id)}
            >
              <EditIcon
                sx={{
                  height: "16px",
                  width: "16px",
                  color: "rgba(54, 54, 54, 0.7)",
                }}
              ></EditIcon>
            </button>
          )}
        </div>
      </div>
      <div className="project-link">
        <button className="project-link-task" onClick={hancleChangeTask}>
          Task
        </button>
        <button className="project-link-team" onClick={hancleChangeTeam}>
          Team
        </button>
        <div
          className="project-link-status"
          style={{ display: "flex", float: "right" }}
        >
          <div className="project-link-status-title">Status:</div>
          {data.isDone ? (
            <div className="project-link-status-archive">Archive</div>
          ) : (
            <div className="project-link-status-unarchive">Active</div>
          )}
        </div>
      </div>
      <div className="project-table">
        {isTaskActive && (
          <table className="project-table-row" key={0}>
            <tbody>
              <tr className="project-table-row-title">
                <th className="project-table-row-title-task">Task</th>
                <th className="project-table-row-title-track">Tracked (h)</th>
              </tr>

              {dataTask.map((task, index) => (
                <>
                  <tr className="project-table-row-content" key={index}>
                    <td
                      className="project-table-row-content-task"
                      style={{ padding: "12px 0px 8px 0px" }}
                    >
                      <div className="project-table-row-content-task-link">
                        {task.isSelected ? (
                          <RemoveIcon
                            onClick={() => {
                              setdataTask(
                                dataTask.map((d) => {
                                  if (d.id === task.id) {
                                    d.isSelected = false;
                                  }
                                  return d;
                                })
                              );
                            }}
                            sx={{
                              marginTop: "5px",
                              marginRight: "9px",
                              height: "16px",
                              width: "16px",
                              backgroundColor: "rgba(255,255,255,0)",
                              cursor: "pointer",
                            }}
                          ></RemoveIcon>
                        ) : (
                          <AddIcon
                            onClick={() => {
                              setdataTask(
                                dataTask.map((d) => {
                                  if (d.id === task.id) {
                                    d.isSelected = true;
                                  }
                                  return d;
                                })
                              );
                            }}
                            sx={{
                              marginTop: "5px",
                              marginRight: "9px",
                              height: "16px",
                              width: "16px",
                              backgroundColor: "rgba(255,255,255,0)",
                              cursor: "pointer",
                            }}
                          ></AddIcon>
                        )}

                        <button className="project-table-row-content-task-link-btn">
                          {task.taskName}
                        </button>
                      </div>
                      <div className="project-table-row-content-task-user">
                        {task.isSelected ? (
                          <>
                            {task.users.map((d, index) => (
                              <div className="project-table-row-content-task-user-item">
                                <Avatar
                                  sx={{
                                    marginRight: "16px",
                                    width: "35px",
                                    height: "35px",
                                  }}
                                  alt={d.userName}
                                  src={d.avatarUrl}
                                  key={index}
                                />
                                <p className="project-table-row-content-task-user-item-name">
                                  {d.userName}
                                </p>
                              </div>
                            ))}
                          </>
                        ) : (
                          <AvatarGroup max={4} style={{ float: "left" }}>
                            {task.users.map((d, index) => (
                              <Avatar
                                sx={{
                                  marginRight: "16px",
                                }}
                                alt={d.userName}
                                src={d.avatarUrl}
                                key={index}
                              />
                            ))}
                          </AvatarGroup>
                        )}
                      </div>
                    </td>
                    <td className="project-table-row-content-track">
                      {task.trackedTime}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        )}
        {isTeamActive && (
          <table className="project-table-row" key={1}>
            <tbody>
              <tr className="project-table-row-title">
                <th className="project-table-row-title-task">Member</th>
                <th className="project-table-row-title-track">Tracked (h)</th>
              </tr>
              {dataTeam.map((team, index) => (
                <>
                  <tr className="project-table-row-content" key={index}>
                    <td
                      className="project-table-row-content-task"
                      style={{ padding: "12px 0px 8px 0px" }}
                    >
                      <div className="project-table-row-content-task-link">
                        {team.isSelecteds ? (
                          <RemoveIcon
                            onClick={() => {
                              setdataTeam(
                                dataTeam.map((d) => {
                                  if (d.userId === team.userId) {
                                    d.isSelecteds = false;
                                  }
                                  return d;
                                })
                              );
                            }}
                            sx={{
                              height: "16px",
                              width: "16px",
                              marginTop: "9px",
                              backgroundColor: "rgba(255,255,255,0)",
                            }}
                          ></RemoveIcon>
                        ) : (
                          <AddIcon
                            onClick={() => {
                              setdataTeam(
                                dataTeam.map((d) => {
                                  if (d.userId === team.userId) {
                                    d.isSelecteds = true;
                                  }
                                  return d;
                                })
                              );
                            }}
                            sx={{
                              height: "16px",
                              width: "16px",
                              marginTop: "9px",
                              backgroundColor: "rgba(255,255,255,0)",
                            }}
                          ></AddIcon>
                        )}
                        <Avatar
                          sx={{
                            margin: "0px 10px",
                            width: "35px",
                            height: "35px",
                          }}
                          alt={team.userName}
                          src={team.avatarUrl}
                        />
                        <button className="project-table-row-content-task-link-btn">
                          {team.userName}
                        </button>
                        {team.isPM && (
                          <span className="project-table-row-content-task-link-pm ">
                            PM
                          </span>
                        )}
                      </div>
                      <div className="project-table-row-content-task-total">
                        {team.isSelecteds ? (
                          <>
                            {team.list_task.map((n, index) => (
                              <p key={index}>{n.taskName}</p>
                            ))}
                          </>
                        ) : (
                          <>{team.taskCount} tasks</>
                        )}
                      </div>
                    </td>
                    <td className="project-table-row-content-track">
                      {team.trackedTime}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Notification notify={notify} setNotify={setNotify}></Notification>
    </div>
  );
};

export default ProjectInfoItem;
