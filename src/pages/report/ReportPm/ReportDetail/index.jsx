import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  CircularProgress,
  FormControl,
  Input,
  InputAdornment,
} from "@mui/material";
import { Modal, Pagination, Select } from "antd";
import CalendarRangePickerCustom from "../../../report/CalendarRangePickerCustom";
import {
  FORMAT_DATE,
  FORMAT_DATE_REPORT_DETAIL,
} from "../../../../constants/common";
import _ from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import ReportPmService from "services/ReportPmService";
import "./index.scss";
import ReportDetailTable from "./ReportDetailTable";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setReportDateRange } from "../../../../redux/slices/reportDateRangeSlice";
import { reportApi } from "../../../../api/report/report.api";

const { Option } = Select;
const { confirm } = Modal;

const FILTER_GROUP_BY = {
  MEMBER: "member",
  PROJECT: "project",
  CLIENT: "client",
  TASK: "task",
};

const ReportDetail = () => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const [dataReport, setDataReport] = useState([]);
  const [dataReportFormatted, setDataReportFormatted] = useState([]);
  const [dataReportSearched, setDataReportSearched] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [filterGroupBy, setFilterGroupBy] = useState(FILTER_GROUP_BY.PROJECT);
  const [searchInput, setSearchInput] = useState("");
  const [changeFilterActive, setChangeFilterActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRow, setTotalRow] = useState(0);
  const dateRangePicker = useSelector((state) => state.reportDateRange);
  const [memberData, setMemberData] = useState(
    useSelector((state) => state.reportPageData.listUser)
  );
  const [projectData, setProjectData] = useState(
    useSelector((state) => state.reportPageData.listProject)
  );
  const [filterReportListProject, setFilterReportListProject] = useState([]);
  const [filterReportListPeople, setFilterReportListPeople] = useState([]);
  const [recordFilterData, setRecordFilterData] = useState({
    memberData: [],
    projectData: [],
    filterReportListProject: [],
    filterReportListPeople: [],
    recoded: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const state = location.state;
    if (state.projectId) {
      const nameProject = findNameById(state.projectId, projectData);
      onChangeValueProject(state.projectId, nameProject);
    }
    if (state.memberId) {
      const nameMember = findNameById(state.memberId, memberData);
      onChangeValueMember(state.memberId, nameMember);
    }
  }, [location]);

  const findNameById = (id, data) => {
    const resultData = data.filter((item) => id === item.id);
    return resultData[0]?.projectName || resultData[0]?.userName;
  };

  const groupDataByFilter = (filter, data) => {
    const keyFilterArray = data.map((item) => item[filter]);
    const keyFilter = [...new Set(keyFilterArray)];
    const newData = keyFilter.map((key) => {
      const listItemGroup = data.filter((item) => item[filter] === key);
      return {
        groupName: key,
        list: listItemGroup,
        totalTime: listItemGroup.reduce((previousValue, currentValue) => {
          return previousValue + currentValue.trackedTime;
        }, 0),
      };
    });
    return newData;
  };

  useEffect(() => {
    setDataReportFormatted(
      groupDataByFilter(filterGroupBy, dataReportSearched)
    );
    setTotalTime(
      dataReportSearched
        .reduce((previousValue, currentValue) => {
          return previousValue + currentValue.trackedTime;
        }, 0)
        .toFixed(1)
    );
  }, [filterGroupBy, dataReportSearched]);

  useEffect(() => {
    // if (dataReport) {
    const newData = dataReport.filter((item) => {
      return (
        hasSearchInput(item.project, searchInput) ||
        hasSearchInput(item.description, searchInput) ||
        hasSearchInput(item.member, searchInput) ||
        hasSearchInput(item.client, searchInput)
      );
    });
    setDataReportSearched(newData);
    // }
  }, [searchInput, dataReport]);

  useEffect(() => {
    if (!dateRangePicker[0]) {
      dispatch(setReportDateRange([moment().startOf("isoWeek"), moment()]));
    }
  }, [dateRangePicker, dispatch]);

  const hasSearchInput = (dataCompare, searchInput) => {
    return dataCompare.toLowerCase().includes(searchInput.toLowerCase());
  };

  const onChangeValueProject = (value, children) => {
    setProjectData((prev) =>
      projectData.filter((project) => project.id !== value)
    );
    setFilterReportListProject([
      ...filterReportListProject,
      { name: children, id: value },
    ]);
  };

  const onChangeValueMember = (value, children) => {
    setMemberData((prev) =>
      memberData.filter((member) => member.userId !== value)
    );
    setFilterReportListPeople([
      ...filterReportListPeople,
      { name: children, id: value },
    ]);
  };

  useEffect(() => {
    const fetchDataReport = async () => {
      setIsLoading(true);
      const res = await reportApi.getReportDetail(
        filterReportListPeople.map((item) => item.id).join("&userIds="),
        filterReportListProject.map((item) => item.id).join("&projectIds="),
        moment(dateRangePicker[0]).format(FORMAT_DATE),
        moment(dateRangePicker[1]).format(FORMAT_DATE),
        currentPage,
        pageSize
      );
      const newDataReport = res.data.resultObj;
      if (newDataReport) {
        setIsLoading(false);
        setDataReport(newDataReport.dataReport);
        setTotalRow(newDataReport.dataSize);
      }
      setIsLoading(false);
    };
    const fetchDataReportDelay = _.debounce(fetchDataReport, 300);
    if (!recordFilterData.recoded) {
      fetchDataReportDelay();
    }
    return fetchDataReportDelay.cancel;
  }, [
    currentPage,
    pageSize,
    filterReportListPeople,
    filterReportListProject,
    recordFilterData,
    userId,
    dateRangePicker,
  ]);

  // const exportFile = async () => {};
  const exportFile = async () => {
    const res = await reportApi.exportReportDetail(
      filterReportListPeople.map((item) => item.id).join("&userIds="),
      filterReportListProject.map((item) => item.id).join("&projectIds="),
      moment(dateRangePicker[0]).format(FORMAT_DATE),
      moment(dateRangePicker[1]).format(FORMAT_DATE),
      currentPage,
      pageSize,
      filterGroupBy
    );
    const blob = res.data;
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `report.xlsx`);
    // Append to html link element page
    document.body.appendChild(link);
    // Start download
    link.click();
    // Clean up and remove the link
    link.parentNode.removeChild(link);
  };

  const showModalConfirmExport = () => {
    confirm({
      centered: true,
      title: "Export detail",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to export detail to Exel file`,
      async onOk() {
        exportFile();
      },
      onCancel() {},
    });
  };

  return (
    <div className="report-detail-container">
      <div className="report-detail">
        <div className="report-detail-header">
          <Link to={"/report"} className="report-detail-header-back">
            <ArrowLeftIcon sx={{ fontSize: "20px" }} />
            Back to report
          </Link>
          <div className="report-detail-header-title">
            <div className="report-detail-header-title-label">
              Detailed reports
            </div>
            {!changeFilterActive && (
              <button
                className="report-detail-header-title-change-filter"
                onClick={() => {
                  setRecordFilterData({
                    memberData: memberData,
                    projectData: projectData,
                    filterReportListProject: filterReportListProject,
                    filterReportListPeople: filterReportListPeople,
                    recoded: true,
                  });
                  setChangeFilterActive(true);
                }}
              >
                Change Filters
              </button>
            )}
          </div>
        </div>

        {changeFilterActive ? (
          <div className="report-detail-filter">
            <div className="report-detail-filter-time">
              <div className="report-detail-filter-time-label">Time frame:</div>
              <div className="report-detail-filter-time-picker">
                <CalendarRangePickerCustom
                  value={dateRangePicker}
                  suffixIcon={<DownOutlined style={{ fontSize: "12px" }} />}
                />
              </div>
            </div>
            <div className="report-detail-filter-project">
              <div className="report-detail-filter-project-label">Project:</div>
              <div className="report-detail-filter-project-choose">
                {filterReportListProject.map((project) => {
                  return (
                    <div
                      className="report-detail-filter-project-choose-item"
                      key={project.id}
                    >
                      <span>{project.name}</span>
                      <CloseIcon
                        onClick={() => {
                          setFilterReportListProject(
                            filterReportListProject.filter(
                              (item) => item.id !== project.id
                            )
                          );
                          setProjectData([
                            ...projectData,
                            { projectName: project.name, id: project.id },
                          ]);
                        }}
                        sx={{
                          fontSize: "14px",
                          marginLeft: "6px",
                          color: "rgba(54, 54, 54, 0.7)",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  );
                })}
                <Select
                  showArrow={false}
                  className="report-detail-filter-project-choose-button "
                  bordered={false}
                  showSearch
                  optionFilterProp="children"
                  onChange={(value, { children }) =>
                    onChangeValueProject(value, children)
                  }
                  value={"Choose project..."}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {projectData?.map((project) => (
                    <Option value={project.id} key={project.id}>
                      {`${project.projectName}`}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="report-detail-filter-people">
              <div className="report-detail-filter-people-label">People:</div>
              <div className="report-detail-filter-people-choose">
                {filterReportListPeople.map((people) => {
                  return (
                    <div
                      className="report-detail-filter-people-choose-item"
                      key={people.id}
                    >
                      <span>{people.name}</span>
                      <CloseIcon
                        onClick={() => {
                          setFilterReportListPeople(
                            filterReportListPeople.filter(
                              (item) => item.id !== people.id
                            )
                          );
                          setMemberData([
                            ...memberData,
                            { userName: people.name, userId: people.id },
                          ]);
                        }}
                        sx={{
                          fontSize: "14px",
                          marginLeft: "6px",
                          color: "rgba(54, 54, 54, 0.7)",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  );
                })}
                <Select
                  className="report-detail-filter-people-choose-button"
                  showArrow={false}
                  bordered={false}
                  showSearch
                  optionFilterProp="children"
                  onChange={(value, { children }) =>
                    onChangeValueMember(value, children)
                  }
                  value={"Choose person..."}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {memberData?.map((member) => (
                    <Option value={member.userId} key={member.userId}>
                      {member.userName}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="report-detail-filter-action">
              <button
                className="report-detail-filter-action-run-report"
                onClick={() => {
                  setRecordFilterData({ ...recordFilterData, recoded: false });
                  setChangeFilterActive(false);
                }}
              >
                Run report
              </button>
              <button
                className="report-detail-filter-action-cancel"
                onClick={() => {
                  setFilterReportListPeople(
                    recordFilterData.filterReportListPeople
                  );
                  setFilterReportListProject(
                    recordFilterData.filterReportListProject
                  );
                  setMemberData(recordFilterData.memberData);
                  setProjectData(recordFilterData.projectData);
                  setRecordFilterData({ ...recordFilterData, recoded: false });
                  setChangeFilterActive(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="report-detail-filter-disable">
            <div className="report-detail-filter-disable-time">
              <div className="report-detail-filter-disable-time-label">
                Time frame
              </div>
              <div className="report-detail-filter-disable-time-picker">
                {`${moment(dateRangePicker[0]).format(
                  FORMAT_DATE_REPORT_DETAIL
                )} - ${moment(dateRangePicker[1]).format(
                  FORMAT_DATE_REPORT_DETAIL
                )}`}
              </div>
            </div>
            <div className="report-detail-filter-disable-project">
              <div className="report-detail-filter-disable-project-label">
                Projects
              </div>
              <div className="report-detail-filter-disable-project-picker">
                {filterReportListProject.length
                  ? `${filterReportListProject
                      .map((item) => item.name)
                      .join(", ")}`
                  : "All"}
              </div>
            </div>
            <div className="report-detail-filter-disable-time-total">
              <div className="report-detail-filter-disable-time-total-label">
                Total
              </div>
              <div className="report-detail-filter-disable-time-total-picker">
                {`${totalTime} hours`}
              </div>
            </div>
            <div className="report-detail-filter-disable-people">
              <div className="report-detail-filter-disable-people-label">
                People
              </div>
              <div className="report-detail-filter-disable-people-picker">
                {filterReportListPeople.length
                  ? `${filterReportListPeople
                      .map((item) => item.name)
                      .join(", ")}`
                  : "Everyone"}
              </div>
            </div>
          </div>
        )}
        <div className="report-detail-search">
          <div className="report-detail-search-group-by">
            <div className="report-detail-search-group-by-label">Group by:</div>
            <div className="report-detail-search-group-by-dropdown">
              <Select
                showSearch
                bordered={false}
                placeholder="Select group"
                optionFilterProp="children"
                onChange={(value) => setFilterGroupBy(value)}
                defaultValue={FILTER_GROUP_BY.PROJECT}
                style={{
                  color: "#363636",
                  fontFamily: "Lato",
                  fontSize: "16px",
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value={FILTER_GROUP_BY.PROJECT}>Project</Option>
                <Option value={FILTER_GROUP_BY.TASK}>Task</Option>
                <Option value={FILTER_GROUP_BY.CLIENT}>Client</Option>
                <Option value={FILTER_GROUP_BY.MEMBER}>Member</Option>
              </Select>
            </div>
          </div>
          <div className="report-detail-search-bar">
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

          {/* <button
            className="report-detail-export"
            onClick={() => showModalConfirmExport()}
          >
            Export
            <div className="report-detail-export-icon">
              <ArrowDropDownIcon />
            </div>
          </button> */}
        </div>
        <div className="report-detail-table-container">
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
            <ReportDetailTable dataReportFormatted={dataReportFormatted} />
          )}
          <div className="report-detail-pagination">
            <Pagination
              onChange={(page) => {
                setCurrentPage(page);
              }}
              current={currentPage}
              total={totalRow}
              pageSize={pageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
