// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import SearchIcon from "@mui/icons-material/Search";
// import { FormControl, Input, InputAdornment } from "@mui/material";
// import { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
// import CardProject from "../CardProject";
// import "./index.scss";
// import ListCardProjectFooter from "./ListCardProjectFooter";

// const ListProject = ({ projectData, handleClickWorking }) => {
//   const sliderRef = useRef();
//   const [searchProjectInput, setSearchProjectInput] = useState("");
//   const [listProject, setListProject] = useState(projectData);
//   useEffect(() => {
//     if (!searchProjectInput) {
//       setListProject(projectData);
//       return;
//     }
//     const filteredDataByProject = listProject.filter((project) => {
//       return project.projectName
//         .toLowerCase()
//         .includes(searchProjectInput.toLowerCase());
//     });

//     const ids = filteredDataByProject.map((project) => project.id);
//     const filteredDataByTask = listProject.filter(
//       (project) =>
//         !ids.includes(project.id) && hasTask(project, searchProjectInput)
//     );
//     const newDataFiltered = [...filteredDataByProject, ...filteredDataByTask];

//     setListProject(newDataFiltered);
//   }, [searchProjectInput, projectData]);

//   const hasTask = (project, searchProjectInput) => {
//     const task = project.projectTasks.filter((task) => {
//       return task.taskName
//         .toLowerCase()
//         .includes(searchProjectInput.toLowerCase());
//     });
//     return task.length ? true : false;
//   };

//   var settings = {
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     variableWidth: true,
//     swipeToSlide: true,
//   };

//   return (
//     <div className="list-card-project">
//       <div className="list-card-project-header">
//         <FormControl variant="standard">
//           <Input
//             id="input-with-icon-adornment"
//             value={searchProjectInput}
//             placeholder="Search Project"
//             onChange={(event) => setSearchProjectInput(event.target.value)}
//             sx={{ border: "none" }}
//             startAdornment={
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ fontSize: 24 }} />
//               </InputAdornment>
//             }
//           />
//         </FormControl>
//         <div className="list-card-project-header-pagination">
//           <ArrowBackIosNewIcon
//             onClick={() => {
//               sliderRef.current.slickPrev();
//             }}
//             sx={{
//               fontSize: 16,
//               color: "rgba(54,54,54,0.5)",
//               marginRight: 2,
//               cursor: "pointer",
//             }}
//           />
//           <ArrowForwardIosIcon
//             onClick={() => {
//               sliderRef.current.slickNext();
//             }}
//             sx={{
//               fontSize: 16,
//               color: "rgba(54,54,54,0.5)",
//               cursor: "pointer",
//             }}
//           />
//         </div>
//       </div>
//       <div className="list-card-project-container">
//         <Slider ref={sliderRef} {...settings}>
//           {listProject.map((project) => (
//             <CardProject
//               {...project}
//               listTask={project.projectTasks}
//               key={project.id}
//               handleClickWorking={handleClickWorking}
//               projectId={project.id}
//             />
//           ))}
//         </Slider>
//       </div>
//       <ListCardProjectFooter />
//     </div>
//   );
// };

// export default ListProject;

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, Input, InputAdornment } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CardProject from "../CardProject";
import "./index.scss";
import ListCardProjectFooter from "./ListCardProjectFooter";

const ListProject = ({ projectData, handleClickWorking }) => {
  const sliderRef = useRef();
  const [searchProjectInput, setSearchProjectInput] = useState("");
  const [listProject, setListProject] = useState(projectData);
  useEffect(() => {
    if (!searchProjectInput) {
      setListProject(projectData);
      return;
    }
    const filteredDataByProject = listProject.filter((project) => {
      return project.projectName
        .toLowerCase()
        .includes(searchProjectInput.toLowerCase());
    });

    const ids = filteredDataByProject.map((project) => project.id);
    const filteredDataByTask = listProject.filter(
      (project) =>
        !ids.includes(project.id) && hasTask(project, searchProjectInput)
    );
    const newDataFiltered = [...filteredDataByProject, ...filteredDataByTask];

    setListProject(newDataFiltered);
  }, [searchProjectInput, projectData]);

  const hasTask = (project, searchProjectInput) => {
    const task = project.projectTasks.filter((task) => {
      return task.taskName
        .toLowerCase()
        .includes(searchProjectInput.toLowerCase());
    });
    return task.length ? true : false;
  };

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
    swipeToSlide: true,
  };

  return (
    <div className="list-card-project">
      <div className="list-card-project-header">
        <FormControl variant="standard">
          <Input
            id="input-with-icon-adornment"
            value={searchProjectInput}
            placeholder="Search project"
            onChange={(event) => setSearchProjectInput(event.target.value)}
            sx={{ border: "none" }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 24 }} />
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="list-card-project-header-pagination">
          <ArrowBackIosNewIcon
            onClick={() => {
              sliderRef.current.slickPrev();
            }}
            sx={{
              fontSize: 16,
              color: "rgba(54,54,54,0.5)",
              marginRight: 2,
              cursor: "pointer",
            }}
          />
          <ArrowForwardIosIcon
            onClick={() => {
              sliderRef.current.slickNext();
            }}
            sx={{
              fontSize: 16,
              color: "rgba(54,54,54,0.5)",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      <div className="list-card-project-container">
        <Slider ref={sliderRef} {...settings}>
          {listProject.map((project) => (
            <CardProject
              {...project}
              listTask={project.projectTasks}
              key={project.id}
              handleClickWorking={handleClickWorking}
              projectId={project.id}
            />
          ))}
        </Slider>
      </div>
      <ListCardProjectFooter />
    </div>
  );
};

export default ListProject;
