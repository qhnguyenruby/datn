import BarChartCustom from "../../../../components/BarChartCustom";
import { FORMAT_DATE } from "../../../../constants/common";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setReportDateRange } from "../../../../redux/slices/reportDateRangeSlice";
import { convertColorToGradient } from "../../../../utils/convertColorToGradient";
import ReportPmList from "../ReportPmList";
import SearchReportPm from "../SearchReportPm";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import "./index.scss";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { reportApi } from "../../../../api/report/report.api";
import jwtDecode from "jwt-decode";

const REPORT_PM_PROJECT_FILTER = {
  TASK: "task",
  PEOPLE: "member",
};

const ReportByProject = () => {
  const { projectId } = useParams();
  const dateRangePicker = useSelector((state) => state.reportDateRange);
  const userId = jwtDecode(localStorage.getItem("token")).userId;
  const [dataChartBar, setDataChartBar] = useState([]);
  const [dataByFilter, setDataByFilter] = useState([]);
  const [dataProject, setDataProject] = useState({
    name: "",
    client: "",
    time: 0,
    color: "",
  });
  const [isFilterPeople, setIsFilterPeople] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dateRangePicker[0]) {
      dispatch(setReportDateRange([moment().startOf("isoWeek"), moment()]));
    }
  }, [dateRangePicker, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = isFilterPeople
        ? await reportApi.getProjectDetailReportBy(
            projectId,
            moment(dateRangePicker[0]).format(FORMAT_DATE),
            moment(dateRangePicker[1]).format(FORMAT_DATE),
            REPORT_PM_PROJECT_FILTER.PEOPLE
          )
        : await reportApi.getProjectDetailReportBy(
            projectId,
            moment(dateRangePicker[0]).format(FORMAT_DATE),
            moment(dateRangePicker[1]).format(FORMAT_DATE),
            REPORT_PM_PROJECT_FILTER.TASK
          );
      const dataByFilter = res.data.resultObj;
      const newDataFilter = isFilterPeople
        ? dataByFilter.map((item) => {
            return {
              ...item,
              trackedTime: item.list_task?.reduce((total, currentValue) => {
                return total + currentValue.trackedTime;
              }, 0),
              list: item.list_task,
            };
          })
        : dataByFilter.map((item) => {
            return {
              ...item,
              trackedTime: item.users?.reduce((total, currentValue) => {
                return total + currentValue.trackedTime;
              }, 0),
              list: item.users,
            };
          });

      setDataByFilter(newDataFilter);
      setIsLoading(false);
    };
    fetchData();
  }, [dateRangePicker, userId, projectId, isFilterPeople]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await reportApi.getProjectReport(
        projectId,
        moment(dateRangePicker[0]).format(FORMAT_DATE),
        moment(dateRangePicker[1]).format(FORMAT_DATE)
      );
      const dataProject = res.data.resultObj;
      const newDataProject = {
        name: dataProject.projectName,
        client: dataProject.client,
        time: dataProject.trackedTime,
        color: dataProject.color,
      };
      const newDataChart = dataProject.dataChart.map((item) => {
        return {
          name: item.date,
          time: item.duration / 60,
        };
      });
      setDataChartBar(newDataChart);
      setDataProject(newDataProject);
    };
    fetchData();
  }, [dateRangePicker, userId, projectId]);

  return (
    <div className="report-project-container">
      <div className="report-project">
        <Link to={"/report"} className="report-project-back">
          <ArrowLeftIcon sx={{ fontSize: "20px" }} />
          Back to report
        </Link>
        <div className="report-project-title">Reports</div>
        <SearchReportPm
          projectId={parseInt(projectId)}
          dateRangePicker={dateRangePicker}
        />
        <div className="report-project-chart">
          <div className="report-project-chart-header">
            <div className="report-project-chart-header-name">
              <div
                className="report-project-chart-header-name-color"
                style={{
                  background: convertColorToGradient(dataProject.color),
                }}
              ></div>
              <div className="report-project-chart-header-name-label">
                <div className="report-project-chart-header-name-label-client">
                  {dataProject.client}
                </div>
                <div className="report-project-chart-header-name-label-project">
                  {dataProject.name}
                </div>
              </div>
            </div>
            <div className="report-project-chart-header-time">
              <div className="report-project-chart-header-time-number">
                {(dataProject.time / 60).toFixed(0)}
              </div>
              <div className="report-project-chart-header-time-label">
                hours tracked
              </div>
            </div>
          </div>
          <div className="report-project-chart-bar">
            <BarChartCustom data={dataChartBar} />
          </div>
        </div>
        <div className="report-project-filter">
          <div className="report-project-filter-header">
            <div
              className={
                isFilterPeople
                  ? "report-project-filter-header-people active"
                  : "report-project-filter-header-people"
              }
              onClick={() => setIsFilterPeople(true)}
            >
              By People
            </div>
            <div
              className={
                isFilterPeople
                  ? "report-project-filter-header-task"
                  : "report-project-filter-header-task active"
              }
              onClick={() => setIsFilterPeople(false)}
            >
              By Tasks
            </div>
          </div>
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
            <ReportPmList data={dataByFilter} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportByProject;
