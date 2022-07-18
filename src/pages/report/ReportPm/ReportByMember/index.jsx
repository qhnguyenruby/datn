import BarChartCustom from "../../../../components/BarChartCustom";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setReportDateRange } from "../../../../redux/slices/reportDateRangeSlice";
import ReportPmList from "../ReportPmList";
import SearchReportPm from "../SearchReportPm";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import "./index.scss";
import { FORMAT_DATE } from "../../../../constants/common";
import { Box, CircularProgress } from "@mui/material";
import { reportApi } from "../../../../api/report/report.api";
import jwtDecode from "jwt-decode";

const REPORT_PM_MEMBER_FILTER = {
  PROJECT: "project",
  TASK: "task",
};

const ReportByMember = () => {
  const dateRangePicker = useSelector((state) => state.reportDateRange);
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const [isFilterProject, setIsFilterProject] = useState(true);
  const { memberId } = useParams();
  const [dataChartBar, setDataChartBar] = useState([]);
  const [dataByFilter, setDataByFilter] = useState([]);
  const [dataMember, setDataMember] = useState({
    userName: "",
    email: "",
    time: 0,
    avatarUrl: "",
  });
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
      const res = isFilterProject
        ? await reportApi.getUserDetailReportBy(
            memberId,
            moment(dateRangePicker[0]).format(FORMAT_DATE),
            moment(dateRangePicker[1]).format(FORMAT_DATE),
            REPORT_PM_MEMBER_FILTER.PROJECT
          )
        : await reportApi.getUserDetailReportBy(
            memberId,
            moment(dateRangePicker[0]).format(FORMAT_DATE),
            moment(dateRangePicker[1]).format(FORMAT_DATE),
            REPORT_PM_MEMBER_FILTER.TASK
          );

      const dataByFilter = res.data.resultObj;

      const newDataFilter = isFilterProject
        ? dataByFilter.map((project) => {
            return {
              ...project,
              trackedTime: project.projectTasks.reduce(
                (total, currentValue) => {
                  return total + currentValue.trackedTime;
                },
                0
              ),
              list: project.projectTasks,
            };
          })
        : dataByFilter.map((task) => {
            return {
              ...task,
              trackedTime: task.listTimeEntries.reduce(
                (total, currentValue) => {
                  return total + currentValue.duration;
                },
                0
              ),
              list: task.listTimeEntries.map((item) => {
                return {
                  description: item.description,
                  trackedTime: item.duration,
                };
              }),
            };
          });
      setIsLoading(false);
      setDataByFilter(newDataFilter);
    };
    fetchData();
  }, [dateRangePicker, userId, memberId, isFilterProject]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await reportApi.getUserReport(
        memberId,
        moment(dateRangePicker[0]).format(FORMAT_DATE),
        moment(dateRangePicker[1]).format(FORMAT_DATE)
      );

      const dataMember = res.data.resultObj;

      const newDataMember = {
        userName: dataMember.userName,
        email: dataMember.email,
        time: dataMember.trackedTime,
        avatarUrl: dataMember.avatarUrl,
      };

      const newDataChart = dataMember.dataChart.map((item) => {
        return {
          name: item.date,
          time: item.duration / 60,
        };
      });
      setDataChartBar(newDataChart);
      setDataMember(newDataMember);
    };
    fetchData();
  }, [dateRangePicker, userId, memberId]);

  return (
    <div className="report-member-container">
      <div className="report-member">
        <Link to={"/report"} className="report-member-back">
          <ArrowLeftIcon sx={{ fontSize: "20px" }} />
          Back to report
        </Link>
        <div className="report-member-title">Reports</div>
        <SearchReportPm
          memberId={parseInt(memberId)}
          dateRangePicker={dateRangePicker}
        />
        <div className="report-member-chart">
          <div className="report-member-chart-header">
            <div className="report-member-chart-header-name">
              <img
                src={dataMember.avatarUrl}
                alt=""
                className="report-member-chart-header-name-avatar"
              />
              <div className="report-member-chart-header-name-label">
                <div className="report-member-chart-header-name-label-name">
                  {dataMember.userName}
                </div>
                <div className="report-member-chart-header-name-label-gmail">
                  {dataMember.email}
                </div>
              </div>
            </div>
            <div className="report-member-chart-header-time">
              <div className="report-member-chart-header-time-number">
                {(dataMember.time / 60).toFixed(0)}
              </div>
              <div className="report-member-chart-header-time-label">
                hours tracked
              </div>
            </div>
          </div>
          <div className="report-member-chart-bar">
            <BarChartCustom data={dataChartBar} />
          </div>
        </div>
        <div className="report-member-filter">
          <div className="report-member-filter-header">
            <div
              className={
                isFilterProject
                  ? "report-member-filter-header-people active"
                  : "report-member-filter-header-people"
              }
              onClick={() => setIsFilterProject(true)}
            >
              By Projects
            </div>
            <div
              className={
                isFilterProject
                  ? "report-member-filter-header-task"
                  : "report-member-filter-header-task active"
              }
              onClick={() => setIsFilterProject(false)}
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

export default ReportByMember;
