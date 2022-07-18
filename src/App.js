import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { PAGE_URLS } from "./constants/common";
import Login from "./pages/login";
import HomePage from "./pages/home";
import Report from "./pages/report";
import ReportDetailPage from "./pages/report/ReportPm/ReportDetail";
import Project from "./pages/project";
import NewProject from "./pages/project/NewProject";
import ProjectInfo from "./pages/project/ProjectInfo";
import Manage from "./pages/manage";
import PrivateRoute from "./routes/PrivateRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import RegisterPage from "./pages/register";
import ReportByMemberPage from "./pages/report/ReportByMemberPage";
import ReportByProjectPage from "./pages/report/ReportByProjectPage";

function App() {
  const token = localStorage.getItem("token");
  return (
    // <div className="App">
    //   <Router />
    // </div>
    <Routes>
      <Route element={<PublicRoute token={token} />}>
        <Route path={PAGE_URLS.LOGIN} element={<Login />} />
        <Route path={PAGE_URLS.REGISTER} element={<RegisterPage />} />
      </Route>
      {/* <Route path={PAGE_URLS.LOGIN} element={<Login />} />
      <Route path={PAGE_URLS.REGISTER} element={<RegisterPage />} /> */}
      <Route element={<PrivateRoute token={token} />}>
        <Route path={PAGE_URLS.HOMEPAGE} element={<HomePage />} />
        <Route path={PAGE_URLS.REPORT}>
          <Route path="" element={<Report />} />
          <Route element={<ProtectedRoute token={token} />}>
            <Route
              path={`${PAGE_URLS.REPORT_MEMBER}/:memberId`}
              element={<ReportByMemberPage />}
            />
            <Route
              path={`${PAGE_URLS.REPORT_PROJECT}/:projectId`}
              element={<ReportByProjectPage />}
            />
            <Route
              path={PAGE_URLS.REPORT_DETAIL}
              element={<ReportDetailPage />}
            />
          </Route>
        </Route>
        <Route element={<ProtectedRoute token={token} />}>
          <Route path={PAGE_URLS.PROJECTS} element={<Project />} />
          <Route
            path={`${PAGE_URLS.PROJECTS}${PAGE_URLS.NEWPROJECT}`}
            element={<NewProject />}
          />
          <Route
            path={`${PAGE_URLS.PROJECTS}${PAGE_URLS.EDITPROJECT}/:editProjectId`}
            element={<NewProject />}
          />
          <Route path={PAGE_URLS.MANAGE} element={<Manage />} />
          <Route
            path={`${PAGE_URLS.PROJECTS}${PAGE_URLS.PROJECTS_ITEM}/:projectitemId`}
            element={<ProjectInfo />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
