// import { ExclamationCircleOutlined } from "@ant-design/icons";
// import Archive from "@mui/icons-material/Archive";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import SearchIcon from "@mui/icons-material/Search";
// import Unarchive from "@mui/icons-material/Unarchive";
// import {
//   Avatar,
//   AvatarGroup,
//   Box,
//   CircularProgress,
//   FormControl,
//   Input,
//   InputAdornment,
// } from "@mui/material";
// import { Modal, Pagination } from "antd";
// import { PAGE_URLS } from "../../../constants/common";
// import * as _ from "lodash";
// import React, { useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Notification from "../../../components/Form/Notification";
// import {
//   archiveAProject,
//   getPMProject,
//   getPMProjectDetail,
//   unarchiveAProject,
// } from "../../../redux/action/projectAction";
// import { setProjectEdit } from "../../../redux/action/projectAction";
// import "./HomeProject.scss";
// import jwtDecode from "jwt-decode";
// // import { setProjectEdit } from "../../../redux/slices/projectEditSlice";
// const { confirm } = Modal;
// const HomeProject = () => {
//   // const projectData = {
//   //   client: "An",
//   //   color: "#9c27b0",
//   //   done: false,
//   //   id: 113,
//   //   users: [
//   //     {
//   //       active: true,
//   //       avatarUrl:
//   //         "https://lh3.googleusercontent.com/a-/AOh14GjFlbFHM4npZagH6CveYaIv_e7RJTdSkBx9y3BD=s96-c",
//   //       email: "qhnguyen081100@gmail.com",
//   //       id: "iANAAgogxZXkiy2J3QO1SXNsIQ03",
//   //       name: "Huy Nguyễn",
//   //       role: "PM",
//   //     },
//   //   ],
//   //   name: "alo",
//   //   trackedTime: 213.2,
//   // };
//   const projectState = useSelector((state) => state.project);
//   const dispatch = useDispatch();
//   const listprojectData = projectState.pmProjects;
//   // const listprojectData = [
//   //   {
//   //     client: "An",
//   //     color: "#9c27b0",
//   //     done: false,
//   //     id: 113,
//   //     users: [
//   //       {
//   //         active: true,
//   //         avatarUrl:
//   //           "https://lh3.googleusercontent.com/a-/AOh14GjFlbFHM4npZagH6CveYaIv_e7RJTdSkBx9y3BD=s96-c",
//   //         email: "qhnguyen081100@gmail.com",
//   //         id: "iANAAgogxZXkiy2J3QO1SXNsIQ03",
//   //         name: "Huy Nguyễn",
//   //         role: "PM",
//   //       },
//   //     ],
//   //     name: "alo",
//   //     trackedTime: 2.6,
//   //   },
//   // ];
//   const navigate = useNavigate();
//   const [notify, setNotify] = useState({});
//   const [searchProjectInput, setSearchProjectInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const userId = jwtDecode(localStorage.getItem("token")).id;
//   const idProjectRef = useRef();
//   const [page, setPage] = useState();
//   const [limit, setLimit] = useState();
//   const [name, setName] = useState("");
//   const [total, setTotal] = useState();
//   // const pmProjects = useSelector((state) => state.project.pmProjects);

//   // useEffect(() => {
//   //   (async () => {
//   //     const totalProject = await ProjectService.getTotalProjects(idUser, name);
//   //     setTotal(totalProject);
//   //   })();
//   // }, [idUser, listprojectData]);

//   useEffect(() => {
//     (async () => {
//       dispatch(getPMProject(userId, name, page, limit));
//     })();
//   }, [userId, name]);

//   const handleProjectDetail = async (id) => {
//     navigate(`${PAGE_URLS.PROJECTS}${PAGE_URLS.PROJECTS_ITEM}/${id}`);
//   };

//   const handleProjectEdit = async (event, id) => {
//     event.preventDefault();
//     event.stopPropagation();
//     navigate(`${PAGE_URLS.PROJECTS}${PAGE_URLS.EDITPROJECT}/${id}`);
//   };
//   const deleteProjects = (event, id) => {};
//   // const deleteProjects = (event, id) => {
//   //   event.preventDefault();
//   //   event.stopPropagation();
//   //   confirm({
//   //     centered: true,
//   //     title: "Delete Project",
//   //     icon: <ExclamationCircleOutlined />,
//   //     content: "Are you sure you want to delete this project?",
//   //     async onOk() {
//   //       setTimeout(() => {
//   //         const newlistProject = listprojectData.filter(
//   //           (member) => member.id !== idProjectRef.current
//   //         );
//   //         setlistprojectData([...newlistProject]);
//   //       }, 1000);
//   //       const deleteRes = await ProjectService.deleteProject(idUser, id);
//   //       if (!deleteRes) {
//   //         console.log("Oops errors!");
//   //         return;
//   //       }
//   //       navigate(PAGE_URLS.PROJECTS);
//   //       setNotify({
//   //         isOpen: true,
//   //         message: "Deleted Successfully",
//   //         type: "success",
//   //       });
//   //     },
//   //     onCancel() {},
//   //   });
//   // };

//   // const handleArchive = (id) => {};
//   const handleArchive = (id) => {
//     confirm({
//       centered: true,
//       title: "Archive Project",
//       icon: <ExclamationCircleOutlined />,
//       content: "Are you sure you want to archive this project?",
//       async onOk() {
//         // await ProjectService.getProjectArchive(idUser, id);
//         // const projects = await ProjectService.getListProject(
//         //   idUser,
//         //   limit,
//         //   page,
//         //   name
//         // );
//         await dispatch(archiveAProject(id));
//         dispatch(getPMProject(userId, limit, page, name));
//         navigate(PAGE_URLS.PROJECTS);
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
//   const handleUnArchive = (id) => {
//     confirm({
//       centered: true,
//       title: "UnArchive Project",
//       icon: <ExclamationCircleOutlined />,
//       content: "Are you sure you want to unarchive this project?",
//       async onOk() {
//         await dispatch(unarchiveAProject(id));
//         dispatch(getPMProject(userId, limit, page, name));
//         navigate(PAGE_URLS.PROJECTS);
//         setNotify({
//           isOpen: true,
//           message: "UnArchive Successfully",
//           type: "success",
//         });
//       },
//       onCancel() {},
//     });
//   };
//   // useEffect(() => {
//   //   handleChangePage();
//   // }, [total]);
//   // useEffect(() => {
//   //   const fetchDataProject = async () => {
//   //     setName(searchProjectInput);
//   //     const projects = await ProjectService.getListProject(
//   //       idUser,
//   //       limit,
//   //       page,
//   //       name
//   //     );
//   //     if (!projects) return;
//   //     (async () => {
//   //       const totalProject = await ProjectService.getTotalProjects(
//   //         idUser,
//   //         name
//   //       );
//   //       setTotal(totalProject);
//   //     })();
//   //   };
//   //   const onChangeSearchInputDelay = _.debounce(fetchDataProject, 500);
//   //   onChangeSearchInputDelay();
//   //   return onChangeSearchInputDelay.cancel;
//   // }, [searchProjectInput, name, limit, page]);
//   // useEffect(() => {
//   //   setlistprojectData(projectData);
//   // }, [projectData]);

//   const handleChangePage = async (page = 1, limit = 5) => {};
//   // const handleChangePage = async (page = 1, limit = 5) => {
//   //   setIsLoading(true);
//   //   setPage(page);
//   //   setLimit(limit);
//   //   const projects = await ProjectService.getListProject(
//   //     idUser,
//   //     limit,
//   //     page,
//   //     name
//   //   );
//   //   setIsLoading(false);
//   // };
//   return (
//     <div className="project">
//       <div className="project-header">
//         <h1 className="project-header-title">Project</h1>
//         <Link
//           to={`${PAGE_URLS.PROJECTS}${PAGE_URLS.NEWPROJECT}`}
//           className="project-header-btn"
//         >
//           Create New Project
//         </Link>
//       </div>
//       <div className="project-search">
//         <FormControl variant="standard">
//           <Input
//             id="input-with-icon-adornment"
//             placeholder="Search project"
//             value={searchProjectInput}
//             sx={{ border: "none" }}
//             onChange={(event) => setSearchProjectInput(event.target.value)}
//             startAdornment={
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ fontSize: 24 }} />
//               </InputAdornment>
//             }
//           />
//         </FormControl>
//       </div>
//       <div className="project-table">
//         {isLoading ? (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               height: "64px",
//               marginBottom: "100px",
//             }}
//           >
//             <CircularProgress />
//           </Box>
//         ) : (
//           <table className="project-table-row">
//             <tbody>
//               <tr className="project-table-row-title">
//                 <th className="project-table-row-title-1">Project</th>
//                 <th className="project-table-row-title-2">Client to</th>
//                 <th className="project-table-row-title-3">Tracked time (h)</th>
//                 <th className="project-table-row-title-4">Members</th>
//                 <th className="project-table-row-title-0">Status</th>
//                 <th className="project-table-row-title-5"></th>
//               </tr>

//               {listprojectData.map((data, index) => (
//                 <tr className="project-table-row-content" key={index}>
//                   <td
//                     className="project-table-row-content-1"
//                     onClick={() => handleProjectDetail(data.id)}
//                   >
//                     <p
//                       className="project-table-row-content-1-color"
//                       style={{ backgroundColor: data.color }}
//                     ></p>
//                     <p className="project-table-row-content-1-name">
//                       {data.projectName}
//                     </p>
//                   </td>
//                   <td
//                     className="project-table-row-content-2"
//                     onClick={() => handleProjectDetail(data.id)}
//                   >
//                     <p>{data.client}</p>
//                   </td>
//                   <td
//                     className="project-table-row-content-3"
//                     onClick={() => handleProjectDetail(data.id)}
//                   >
//                     <p>{data.trackedTime}</p>
//                   </td>
//                   <td
//                     className="project-table-row-content-4"
//                     onClick={() => handleProjectDetail(data.id)}
//                   >
//                     <AvatarGroup max={4} style={{ float: "left" }}>
//                       {data.users.map((d, index) => (
//                         <Avatar
//                           sx={{
//                             marginRight: "16px",
//                           }}
//                           alt={d.userName}
//                           src={d.avatarUrl}
//                           key={index}
//                         />
//                       ))}
//                     </AvatarGroup>
//                   </td>
//                   <td className="project-table-row-content-0">
//                     {data.isDone ? (
//                       <div className="project-table-row-content-0-done">
//                         Archive
//                       </div>
//                     ) : (
//                       <div className="project-table-row-content-0-undone">
//                         Active
//                       </div>
//                     )}
//                   </td>
//                   <td className="project-table-row-content-5">
//                     <div className="project-table-row-content-5-icon">
//                       {data.isDone ? (
//                         <button
//                           onClick={() => handleUnArchive(data.id)}
//                           className="project-table-row-content-5-icon-pro"
//                         >
//                           <Unarchive
//                             sx={{
//                               height: "16px",
//                               width: "16px",
//                               color: "rgba(54, 54, 54, 0.7)",
//                             }}
//                           ></Unarchive>
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleArchive(data.id)}
//                           className="project-table-row-content-5-icon-pro"
//                         >
//                           <Archive
//                             sx={{
//                               height: "16px",
//                               width: "16px",
//                               color: "rgba(54, 54, 54, 0.7)",
//                             }}
//                           ></Archive>
//                         </button>
//                       )}
//                       <button
//                         onClick={(e) => deleteProjects(e, data.id)}
//                         className="project-table-row-content-5-icon-pro"
//                       >
//                         <DeleteIcon
//                           sx={{
//                             height: "16px",
//                             width: "16px",
//                             color: "rgba(54, 54, 54, 0.7)",
//                           }}
//                         ></DeleteIcon>
//                       </button>

//                       {!data.isDone && (
//                         <button
//                           className="project-table-row-content-5-icon-pro"
//                           onClick={(event) => handleProjectEdit(event, data.id)}
//                         >
//                           <EditIcon
//                             sx={{
//                               height: "16px",
//                               width: "16px",
//                               color: "rgba(54, 54, 54, 0.7)",
//                             }}
//                           ></EditIcon>
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <Pagination
//         className="pagination"
//         style={{
//           float: "right",
//         }}
//         page={1}
//         pageSize={5}
//         onChange={handleChangePage}
//         total={total}
//         showSizeChanger={false}
//         hideOnSinglePage={true}
//       />
//       <Notification notify={notify} setNotify={setNotify}></Notification>
//     </div>
//   );
// };

// export default HomeProject;

import { ExclamationCircleOutlined } from "@ant-design/icons";
import Archive from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import Unarchive from "@mui/icons-material/Unarchive";
import {
  Avatar,
  AvatarGroup,
  Box,
  CircularProgress,
  FormControl,
  Input,
  InputAdornment,
} from "@mui/material";
import { Modal, Pagination } from "antd";
import * as _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectListProjects,
  setListProjects,
} from "../../../redux/slices/listProjectSlice";
import { PAGE_URLS } from "../../../constants/common";
import { deleteProject } from "../../../redux/slices/projectSlice";
import Notification from "../../../components/Form/Notification";
import "./HomeProject.scss";
import { projectApi } from "../../../api/project/project.api";
import jwtDecode from "jwt-decode";
const { confirm } = Modal;
const HomeProject = () => {
  const projectData = useSelector(selectListProjects);
  const [listprojectData, setlistprojectData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notify, setNotify] = useState({});
  const [searchProjectInput, setSearchProjectInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const idUser = jwtDecode(localStorage.getItem("token")).id;
  const idProjectRef = useRef();
  const [page, setPage] = useState();
  const [limit, setLimit] = useState();
  const [name, setName] = useState("");
  const [total, setTotal] = useState();
  useEffect(() => {
    (async () => {
      const res = await projectApi.getPMProjectAmount(idUser, name);
      const totalProject = res.data.resultObj;
      setTotal(totalProject);
    })();
  }, [idUser, listprojectData]);

  const handleProjectDetail = async (id) => {
    navigate(`${PAGE_URLS.PROJECTS}${PAGE_URLS.PROJECTS_ITEM}/${id}`);
  };
  const handleProjectEdit = async (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`${PAGE_URLS.PROJECTS}${PAGE_URLS.EDITPROJECT}/${id}`);
  };
  const deleteProjects = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    confirm({
      centered: true,
      title: "Delete Project",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete this project?",
      async onOk() {
        setTimeout(() => {
          const newlistProject = listprojectData.filter(
            (member) => member.id !== idProjectRef.current
          );
          setlistprojectData([...newlistProject]);
        }, 1000);
        const deleteRes = await projectApi.deleteProject(idUser, id);
        if (deleteRes.status !== 200) {
          console.log("Oops errors!");
          return;
        }
        dispatch(deleteProject(id));
        navigate(PAGE_URLS.PROJECTS);
        setNotify({
          isOpen: true,
          message: "Deleted Successfully",
          type: "success",
        });
      },
      onCancel() {},
    });
  };

  const handleArchive = (id) => {
    confirm({
      centered: true,
      title: "Archive Project",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to archive this project?",
      async onOk() {
        await projectApi.archiveAProject(idUser, id);
        const res = await projectApi.getPMProject(idUser, name, page, limit);
        const projects = res.data.resultObj;
        dispatch(setListProjects(projects));
        navigate(PAGE_URLS.PROJECTS);
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
        await projectApi.unarchiveAProject(idUser, id);
        const res = await projectApi.getPMProject(idUser, name, page, limit);
        const projects = res.data.resultObj;
        dispatch(setListProjects(projects));
        navigate(PAGE_URLS.PROJECTS);
        setNotify({
          isOpen: true,
          message: "UnArchive Successfully",
          type: "success",
        });
      },
      onCancel() {},
    });
  };
  useEffect(() => {
    handleChangePage();
  }, [total]);
  useEffect(() => {
    const fetchDataProject = async () => {
      setName(searchProjectInput);
      const res = await projectApi.getPMProject(idUser, name, page, limit);
      const projects = res.data.resultObj;
      if (!projects) return;
      dispatch(setListProjects(projects));
      (async () => {
        const res = await projectApi.getPMProjectAmount(idUser, name);
        const totalProject = res.data.resultObj;
        setTotal(totalProject);
      })();
    };
    const onChangeSearchInputDelay = _.debounce(fetchDataProject, 500);
    onChangeSearchInputDelay();
    return onChangeSearchInputDelay.cancel;
  }, [searchProjectInput, name, limit, page]);
  useEffect(() => {
    setlistprojectData(projectData);
  }, [projectData]);
  const handleChangePage = async (page = 1, limit = 5) => {
    setIsLoading(true);
    setPage(page);
    setLimit(limit);
    const res = await projectApi.getPMProject(idUser, name, page, limit);
    const projects = res.data.resultObj;
    dispatch(setListProjects(projects));
    setIsLoading(false);
  };
  return (
    <div className="project">
      <div className="project-header">
        <h1 className="project-header-title">Project</h1>
        <Link
          to={`${PAGE_URLS.PROJECTS}${PAGE_URLS.NEWPROJECT}`}
          className="project-header-btn"
        >
          Create New Project
        </Link>
      </div>
      <div className="project-search">
        <FormControl variant="standard">
          <Input
            id="input-with-icon-adornment"
            placeholder="Search project"
            value={searchProjectInput}
            sx={{ border: "none" }}
            onChange={(event) => setSearchProjectInput(event.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 24 }} />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className="project-table">
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
          <table className="project-table-row">
            <tbody>
              <tr className="project-table-row-title">
                <th className="project-table-row-title-1">Project</th>
                <th className="project-table-row-title-2">Client to</th>
                <th className="project-table-row-title-3">Tracked time (h)</th>
                <th className="project-table-row-title-4">Members</th>
                <th className="project-table-row-title-0">Status</th>
                <th className="project-table-row-title-5"></th>
              </tr>

              {listprojectData.map((data, index) => (
                <tr className="project-table-row-content" key={index}>
                  <td
                    className="project-table-row-content-1"
                    onClick={() => handleProjectDetail(data.id)}
                  >
                    <p
                      className="project-table-row-content-1-color"
                      style={{ backgroundColor: data.color }}
                    ></p>
                    <p className="project-table-row-content-1-name">
                      {data.projectName}
                    </p>
                  </td>
                  <td
                    className="project-table-row-content-2"
                    onClick={() => handleProjectDetail(data.id)}
                  >
                    <p>{data.client}</p>
                  </td>
                  <td
                    className="project-table-row-content-3"
                    onClick={() => handleProjectDetail(data.id)}
                  >
                    <p>{data.trackedTime}</p>
                  </td>
                  <td
                    className="project-table-row-content-4"
                    onClick={() => handleProjectDetail(data.id)}
                  >
                    <AvatarGroup max={4} style={{ float: "left" }}>
                      {data.users.map((d, index) => (
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
                  </td>
                  <td className="project-table-row-content-0">
                    {data.isDone ? (
                      <div className="project-table-row-content-0-done">
                        Archive
                      </div>
                    ) : (
                      <div className="project-table-row-content-0-undone">
                        Active
                      </div>
                    )}
                  </td>
                  <td className="project-table-row-content-5">
                    <div className="project-table-row-content-5-icon">
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
                        onClick={(e) => deleteProjects(e, data.id)}
                        className="project-table-row-content-5-icon-pro"
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
                          className="project-table-row-content-5-icon-pro"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pagination
        className="pagination"
        style={{
          float: "right",
        }}
        page={1}
        pageSize={5}
        onChange={handleChangePage}
        total={total}
        showSizeChanger={false}
        hideOnSinglePage={true}
      />
      <Notification notify={notify} setNotify={setNotify}></Notification>
    </div>
  );
};

export default HomeProject;
