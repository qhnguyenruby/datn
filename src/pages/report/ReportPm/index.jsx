import { DownOutlined } from "@ant-design/icons";
import { FORMAT_DATE, PAGE_URLS } from "../../../constants/common";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setReportPageData } from "../../../redux/slices/reportPageSlice";
import { convertColorToGradient } from "../../../utils/convertColorToGradient";
import "./index.scss";
import SearchReportPm from "./SearchReportPm";
import SearchIcon from "@mui/icons-material/Search";
import { Pagination } from "antd";
import { FormControl, Input, InputAdornment } from "@mui/material";
import { reportApi } from "../../../api/report/report.api";
import jwtDecode from "jwt-decode";

const PAGE_SIZE = 20;

const ReportPm = () => {
  const dateRangePicker = useSelector((state) => state.reportDateRange);
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const projectData = useSelector((state) => state.reportPageData.listProject);
  const memberData = useSelector((state) => state.reportPageData.listUser);
  const [currentProjectPage, setCurrentProjectPage] = useState(1);
  const [currentPeoplePage, setCurrentPeoplePage] = useState(1);
  const [projectDataFormatted, setProjectDataFormatted] = useState([]);
  const [memberDataFormatted, setMemberDataFormatted] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [projectDataSearched, setProjectDataSearched] = useState();
  const [memberDataSearched, setMemberDataSearched] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = dateRangePicker[0]
        ? await reportApi.getReport(
            moment(dateRangePicker[0]).format(FORMAT_DATE),
            moment(dateRangePicker[1]).format(FORMAT_DATE)
          )
        : await reportApi.getReport("", "");
      const reportPageData = res.data.resultObj;
      setProjectDataSearched(reportPageData.listProject);
      setMemberDataSearched(reportPageData.listUser);
      dispatch(setReportPageData(reportPageData));
    };
    fetchData();
  }, [dateRangePicker, userId, dispatch]);

  useEffect(() => {
    const formatDataWithPage = (currentPage, data) => {
      const newData = [];
      for (
        let i = PAGE_SIZE * (currentPage - 1);
        i <
        (data.length < PAGE_SIZE * currentPage
          ? data.length
          : PAGE_SIZE * currentPage);
        i++
      ) {
        newData.push(data[i]);
      }
      return newData;
    };

    if (projectDataSearched) {
      const newDataProject = formatDataWithPage(
        currentProjectPage,
        projectDataSearched
      );
      setProjectDataFormatted(newDataProject);
    }
    if (memberDataSearched) {
      const newMemberProject = formatDataWithPage(
        currentPeoplePage,
        memberDataSearched
      );
      setMemberDataFormatted(newMemberProject);
    }
  }, [
    currentProjectPage,
    projectDataSearched,
    currentPeoplePage,
    memberDataSearched,
  ]);

  useEffect(() => {
    const searchData = (searchInput, data) => {
      return data.filter((item) => {
        const searchString = item.projectName || item.userName;
        return searchString.toLowerCase().includes(searchInput.toLowerCase());
      });
    };
    if (projectData) {
      const searchedDataProject = searchData(searchInput, projectData);
      setProjectDataSearched(searchedDataProject);
      setCurrentProjectPage(1);
    }
    if (memberData) {
      const searchedDataMember = searchData(searchInput, memberData);
      setMemberDataSearched(searchedDataMember);
      setCurrentPeoplePage(1);
    }
  }, [projectData, searchInput, memberData]);

  return (
    <div className="report-pm-container">
      <div className="report-pm">
        <div className="report-pm-title">Reports</div>
        <SearchReportPm dateRangePicker={dateRangePicker} />
        <div className="report-pm-search-by-note">
          <FormControl variant="standard">
            <Input
              id="input-with-icon-adornment"
              value={searchInput}
              placeholder="Search by note"
              onChange={(event) => setSearchInput(event.target.value)}
              sx={{ border: "none" }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 24 }} />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="report-pm-people">
          <div className="report-pm-people-label">People</div>
          <div className="report-pm-people-header">
            <div className="report-pm-people-header-name">
              Name <DownOutlined style={{ fontSize: "12px", marginLeft: 4 }} />
            </div>
            <div className="report-pm-people-header-hours">Hours</div>
          </div>

          {memberDataFormatted?.map((member) => (
            <Link
              to={`${PAGE_URLS.REPORT_MEMBER}/${member.userId}`}
              key={member.userId}
            >
              <div className="report-pm-people-item">
                <div className="report-pm-people-item-user">
                  <img
                    className="report-pm-people-item-user-avatar"
                    src={member.avatarUrl}
                    alt=""
                    srcSet=""
                  />
                  <div className="report-pm-people-item-user-name">
                    {member.userName}
                  </div>
                </div>
                <div className="report-pm-people-item-time">
                  {`${member.trackedTime}h`}
                </div>
              </div>
            </Link>
          ))}
          <div className="report-pm-people-pagination">
            <Pagination
              onChange={(page) => {
                setCurrentPeoplePage(page);
              }}
              current={currentPeoplePage}
              total={memberDataSearched?.length}
              pageSize={PAGE_SIZE}
              showSizeChanger={false}
              hideOnSinglePage={true}
            />
          </div>
        </div>
        <div className="report-pm-project">
          <div className="report-pm-project-label">Projects</div>
          <div className="report-pm-project-header">
            <div className="report-pm-project-header-name">
              Name <DownOutlined style={{ fontSize: "12px", marginLeft: 4 }} />
            </div>
            <div className="report-pm-project-header-hours">Hours</div>
          </div>
          {projectDataFormatted?.map((project) => (
            <Link
              to={`${PAGE_URLS.REPORT_PROJECT}/${project.id}`}
              key={project.id}
            >
              <div className="report-pm-project-item">
                <div className="report-pm-project-item-project">
                  <div
                    className="report-pm-project-item-project-color"
                    style={{
                      background: convertColorToGradient(project.color),
                    }}
                  ></div>
                  <div className="report-pm-project-item-project-name">
                    {project.projectName}
                    <span
                      style={{
                        fontWeight: "400",
                        color: "rgba(54, 54, 54, 0.7)",
                        marginLeft: 4,
                      }}
                    >
                      ({project.client})
                    </span>
                  </div>
                </div>
                <div className="report-pm-project-item-time">
                  <div className="report-pm-project-item-time-done">
                    {project.isDone && "Done"}
                  </div>
                  <span>{`${project.trackedTime}h`}</span>
                </div>
              </div>
            </Link>
          ))}
          <div className="report-pm-project-pagination">
            <Pagination
              onChange={(page) => {
                setCurrentProjectPage(page);
              }}
              current={currentProjectPage}
              total={projectDataSearched?.length}
              pageSize={PAGE_SIZE}
              showSizeChanger={false}
              hideOnSinglePage={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPm;
