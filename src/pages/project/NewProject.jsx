// import { ExclamationCircleOutlined } from "@ant-design/icons";
// import { Grid } from "@mui/material";
// import { Modal } from "antd";
// import { withHeaderHOC } from "../../components/Header/withHeaderHOC";
// import GeneralInfo from "./NewProject/GeneralInfo";
// import Tasks from "./NewProject/Tasks";
// import TeamMembers from "./NewProject/TeamMembers";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   createNewProject,
//   editProject,
//   getProjectEditDetail,
// } from "../../redux/action/projectAction";
// import { PAGE_URLS } from "../../constants/common";
// import Notification from "../../components/Form/Notification";
// import jwtDecode from "jwt-decode";
// import { setProjectEdit } from "../../redux/slices/projectEditSlice";
// const { confirm } = Modal;
// const NewProject = () => {
//   const dispatch = useDispatch();
//   const params = useParams();
//   const { editProjectId } = params;
//   const isAddMore = !editProjectId;
//   const projectState = useSelector((state) => state.project);
//   const dataEdit = projectState.projectEdit;
//   const [notify, setNotify] = useState({});
//   const [dataProject, setdataProject] = useState({
//     name: "",
//     color: "#f44336",
//     client: "",
//     projectTasks: [],
//     users: [],
//   });
//   const [dataTeam, setdataTeam] = useState([]);
//   const [dataTeamByIdAndIsPM, setdataTeamByIdAndIsPM] = useState([]);
//   const [projectname, setprojectname] = useState();
//   const [clientname, setclientname] = useState();
//   const [color, setcolor] = useState();
//   const [dataTask, setdataTask] = useState([]);
//   // const pmProjects = useSelector((state) => state.project.pmProjects);
//   const Navigate = useNavigate();

//   const idUser = jwtDecode(localStorage.getItem("token")).id;

//   const initEditData = isAddMore ? dataProject : dataEdit;

//   useEffect(() => {
//     (async () => {
//       if (!isAddMore) {
//         await dispatch(getProjectEditDetail(editProjectId));
//       } else {
//         console.log("first");
//       }
//     })();
//   }, [editProjectId]);

//   // const handleSubmit = async () => {};
//   const handleSubmit = async () => {
//     if (projectname === "" || clientname === "") {
//       Modal.error({
//         centered: true,
//         title: "Error",
//         icon: <ExclamationCircleOutlined />,
//         content: "You have not entered the general information",
//         onOk() {},
//       });
//     } else {
//       const submitedData = {
//         projectName: projectname,
//         color: color,
//         client: clientname,
//         projectTasks: dataTask,
//         users: dataTeamByIdAndIsPM,
//       };
//       setdataProject(submitedData);
//       dispatch(createNewProject(idUser, submitedData));
//       setNotify({
//         isOpen: true,
//         message: "Create project Successfully",
//         type: "success",
//       });
//       setTimeout(() => {
//         Navigate(PAGE_URLS.PROJECTS);
//       }, [3000]);
//     }
//   };

//   // const handleEdit = async () => {};
//   const handleEdit = async () => {
//     if (projectname === "" || clientname === "") {
//       Modal.error({
//         centered: true,
//         title: "Error",
//         icon: <ExclamationCircleOutlined />,
//         content: "You have not entered the general information",
//         onOk() {},
//       });
//     } else {
//       const submitedData = {
//         id: editProjectId,
//         projectName: projectname,
//         color: color,
//         client: clientname,
//         projectTasks: dataTask,
//         users: dataTeamByIdAndIsPM,
//       };
//       setdataProject(submitedData);
//       dispatch(editProject(idUser, submitedData));
//       setTimeout(() => {
//         Navigate(PAGE_URLS.PROJECTS);
//       }, [3000]);
//       setNotify({
//         isOpen: true,
//         message: "Edit project Successfully",
//         type: "success",
//       });
//     }
//   };

//   const handleTeam = (t) => {
//     setdataTeam(t);
//   };
//   const handleInfo = (project) => {
//     setprojectname(project.name);
//     setclientname(project.client);
//     setcolor(project.color);
//   };
//   const handleTeamByIdAndIsPM = (item) => {
//     setdataTeamByIdAndIsPM(item);
//   };
//   const handleByNameAndUserID = (item) => {
//     setdataTask(item);
//   };
//   const handleCancel = () => {
//     Navigate(PAGE_URLS.PROJECTS);
//   };
//   return (
//     <div>
//       <Grid container>
//         <Grid item xs={2}></Grid>
//         <Grid item xs={8}>
//           <GeneralInfo handleInfo={handleInfo} editGeneInfo={initEditData} />
//           <TeamMembers
//             idUser={idUser}
//             handleTeam={handleTeam}
//             handleTeamByIdAndIsPM={handleTeamByIdAndIsPM}
//             editTeam={initEditData}
//           />
//           <Tasks
//             members={dataTeam}
//             handleByNameAndUserID={handleByNameAndUserID}
//             editTask={initEditData}
//           />

//           <div
//             className="new-project-tasks-body-btn-create"
//             style={{ display: "block", float: "right", marginBottom: "80px" }}
//           >
//             {isAddMore ? (
//               <button
//                 type="submit"
//                 className="new-project-tasks-body-btn-create-new"
//                 onClick={handleSubmit}
//               >
//                 Create New
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 className="new-project-tasks-body-btn-create-new"
//                 onClick={handleEdit}
//               >
//                 Update
//               </button>
//             )}
//             <button
//               type="submit"
//               className="new-project-tasks-body-btn-create-cancel"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           </div>
//         </Grid>
//         <Grid item xs={2}></Grid>
//       </Grid>
//       <Notification notify={notify} setNotify={setNotify}></Notification>
//     </div>
//   );
// };

// export default withHeaderHOC(NewProject);

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Grid } from "@mui/material";
import { Modal } from "antd";
import { withHeaderHOC } from "../../components/Header/withHeaderHOC";
import GeneralInfo from "./NewProject/GeneralInfo";
import Tasks from "./NewProject/Tasks";
import TeamMembers from "./NewProject/TeamMembers";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PAGE_URLS } from "../../constants/common";
import Notification from "../../components/Form/Notification";
import {
  selectProjectEdit,
  setProjectEdit,
} from "../../redux/slices/projectEditSlice";
import { addProjects } from "../../redux/slices/projectSlice";
import { projectApi } from "../../api/project/project.api";
import jwtDecode from "jwt-decode";
const { confirm } = Modal;
const NewProject = () => {
  const params = useParams();
  const { editProjectId } = params;
  const isAddMore = !editProjectId;
  const dataEdit = useSelector(selectProjectEdit);
  const [notify, setNotify] = useState({});
  const [dataProject, setdataProject] = useState({
    projectName: "",
    color: "#f44336",
    client: "",
    projectTasks: [],
    users: [],
  });
  const [dataTeam, setdataTeam] = useState([]);
  const [dataTeamByIdAndIsPM, setdataTeamByIdAndIsPM] = useState([]);
  const [projectname, setprojectname] = useState();
  const [clientname, setclientname] = useState();
  const [color, setcolor] = useState();
  const [dataTask, setdataTask] = useState([]);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const userId = jwtDecode(localStorage.getItem("token")).id;

  const initEditData = isAddMore ? dataProject : dataEdit;

  useEffect(() => {
    (async () => {
      if (!isAddMore) {
        const res = await projectApi.getProjectEditDetail(
          userId,
          editProjectId
        );
        const projectEdit = res.data.resultObj;
        dispatch(setProjectEdit(projectEdit));
      }
    })();
  }, [editProjectId, userId]);

  const handleSubmit = async () => {
    if (projectname === "" || clientname === "") {
      Modal.error({
        centered: true,
        title: "Error",
        icon: <ExclamationCircleOutlined />,
        content: "You have not entered the general information",
        onOk() {},
      });
    } else {
      const submitedData = {
        projectName: projectname,
        color: color,
        client: clientname,
        projectTasks: dataTask,
        users: dataTeamByIdAndIsPM,
      };
      setdataProject(submitedData);
      const taskData = await projectApi.createNewProject(userId, submitedData);
      dispatch(addProjects(taskData));
      setNotify({
        isOpen: true,
        message: "Create project Successfully",
        type: "success",
      });
      setTimeout(() => {
        Navigate(PAGE_URLS.PROJECTS);
      }, [3000]);
    }
  };

  const handleEdit = async () => {
    if (projectname === "" || clientname === "") {
      Modal.error({
        centered: true,
        title: "Error",
        icon: <ExclamationCircleOutlined />,
        content: "You have not entered the general information",
        onOk() {},
      });
    } else {
      const submitedData = {
        id: editProjectId,
        projectName: projectname,
        color: color,
        client: clientname,
        projectTasks: dataTask,
        users: dataTeamByIdAndIsPM,
      };
      debugger;
      setdataProject(submitedData);
      await projectApi.editProject(userId, submitedData);
      setTimeout(() => {
        Navigate(PAGE_URLS.PROJECTS);
      }, [3000]);
      setNotify({
        isOpen: true,
        message: "Edit project Successfully",
        type: "success",
      });
    }
  };

  const handleTeam = (t) => {
    setdataTeam(t);
  };
  const handleInfo = (project) => {
    setprojectname(project.name);
    setclientname(project.client);
    setcolor(project.color);
  };
  const handleTeamByIdAndIsPM = (item) => {
    setdataTeamByIdAndIsPM(item);
  };
  const handleByNameAndUserID = (item) => {
    setdataTask(item);
  };
  const handleCancel = () => {
    Navigate(PAGE_URLS.PROJECTS);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <GeneralInfo handleInfo={handleInfo} editGeneInfo={initEditData} />
          <TeamMembers
            idUser={userId}
            handleTeam={handleTeam}
            handleTeamByIdAndIsPM={handleTeamByIdAndIsPM}
            editTeam={initEditData}
          />
          <Tasks
            members={dataTeam}
            handleByNameAndUserID={handleByNameAndUserID}
            editTask={initEditData}
          />

          <div
            className="new-project-tasks-body-btn-create"
            style={{ display: "block", float: "right", marginBottom: "80px" }}
          >
            {isAddMore ? (
              <button
                type="submit"
                className="new-project-tasks-body-btn-create-new"
                onClick={handleSubmit}
              >
                Create New
              </button>
            ) : (
              <button
                type="submit"
                className="new-project-tasks-body-btn-create-new"
                onClick={handleEdit}
              >
                Update
              </button>
            )}
            <button
              type="submit"
              className="new-project-tasks-body-btn-create-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify}></Notification>
    </div>
  );
};

export default withHeaderHOC(NewProject);
