import BarChartCustom from "../../../components/BarChartCustom";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertMinutesToHours } from "../../../utils/convertMinutesToHours";
import { increaseBrightness } from "../../../utils/increaseBrightness";
import CalendarRangePickerCustom from "../CalendarRangePickerCustom";
import "./index.scss";
import PieChartCustom from "./PieChartCustom";
import ReportPersonalList from "./ReportPersonalList";
import { setReportDateRange } from "../../../redux/slices/reportDateRangeSlice";
import { FORMAT_DATE } from "../../../constants/common";
import {
  getPersonalReport,
  getTeamReport,
} from "../../../redux/action/reportAction";
import { reportApi } from "../../../api/report/report.api";
import jwtDecode from "jwt-decode";

const FILTER_DATA_REPORT = {
  ME: "me",
  TEAM: "team",
};

const ReportPersonal = () => {
  const dateRangePicker = useSelector((state) => state.reportDateRange);
  const reportState = useSelector((state) => state.report);
  const [isTeamFilter, setIsTeamFilter] = useState(false);
  const [dataBarChart, setDataBarChart] = useState([]);
  const [dataPie, setDataPie] = useState([]);
  const [dataList, setDataList] = useState([]);
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const [dataPieChart, setDataPieChart] = useState({
    colors: [],
    data: [],
    total: "00:00",
  });
  // const idUser = useSelector((state) => state.auth.id);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFilterData = (filter) => {
    if (filter === FILTER_DATA_REPORT.ME) {
      setIsTeamFilter(false);
    }
    if (filter === FILTER_DATA_REPORT.TEAM) {
      setIsTeamFilter(true);
    }
  };

  const formatDataChart = (data) => {
    const newData = data.map((item) => {
      return { name: item.name, time: item.time / 60 };
    });
    return newData;
  };

  useEffect(() => {
    const totalTime = dataPie.reduce((total, currentValue) => {
      return total + currentValue.time;
    }, 0);
    const newDataPie = {
      data: dataPie,
      colors: dataPie.map((item) => {
        return increaseBrightness(item.color, 20);
      }),
      total: convertMinutesToHours(totalTime),
    };
    setDataPieChart(newDataPie);
    setDataList(dataPie);
  }, [dataPie]);

  useEffect(() => {
    if (!dateRangePicker[0]) {
      dispatch(setReportDateRange([moment().startOf("isoWeek"), moment()]));
    }
  }, [dateRangePicker, dispatch]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      // setIsLoading(true);
      const res = isTeamFilter
        ? await reportApi.getTeamReport(
            userId,
            moment(dateRangePicker[0]).format(FORMAT_DATE),
            moment(dateRangePicker[1]).format(FORMAT_DATE)
          )
        : await reportApi.getPersonalReport(
            userId,
            moment(dateRangePicker[0]).format(FORMAT_DATE),
            moment(dateRangePicker[1]).format(FORMAT_DATE)
          );

      const { dataBar, dataPie } = res.data.resultObj;

      const newDataBar = dataBar.map((item) => {
        return { time: item.duration, name: item.date };
      });

      const newDataPie = dataPie.map((item) => {
        return {
          ...item,
          time: item.projectTasks.reduce((total, currentValue) => {
            return total + currentValue.trackedTime;
          }, 0),
        };
      });
      if (isSubscribed) {
        setIsLoading(false);
        setDataBarChart(formatDataChart(newDataBar));
        setDataPie(newDataPie);
      }
    };
    fetchData();
    return () => (isSubscribed = false);
  }, [dateRangePicker, isTeamFilter]);

  // useEffect(() => {
  //   let isSubscribed = true;
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     if (isTeamFilter) {
  //       await dispatch(
  //         getTeamReport(
  //           moment(dateRangePicker[0]).format(FORMAT_DATE),
  //           moment(dateRangePicker[1]).format(FORMAT_DATE)
  //         )
  //       );
  //     } else {
  //       await dispatch(
  //         getPersonalReport(
  //           moment(dateRangePicker[0]).format(FORMAT_DATE),
  //           moment(dateRangePicker[1]).format(FORMAT_DATE)
  //         )
  //       );
  //       console.log("personal" + reportState.personalReport);
  //     }
  //     const { dataBar, dataPie } = isTeamFilter
  //       ? reportState.teamReport
  //       : reportState.personalReport;

  //     const newDataBar = dataBar.map((item) => {
  //       return { time: item.duration, name: item.date };
  //     });

  //     const newDataPie = dataPie.map((item) => {
  //       return {
  //         ...item,
  //         time: item.projectTasks.reduce((total, currentValue) => {
  //           return total + currentValue.trackedTime;
  //         }, 0),
  //       };
  //     });
  //     if (isSubscribed) {
  //       setIsLoading(false);
  //       setDataBarChart(formatDataChart(newDataBar));
  //       setDataPie(newDataPie);
  //     }
  //   };
  //   fetchData();
  //   return () => (isSubscribed = false);
  // }, [dateRangePicker, dispatch, isTeamFilter]);

  return (
    <div className="report-personal">
      <div className="report-personal-container">
        <div className="report-personal-header">
          <div className="report-personal-header-name-page">Dashboard</div>
          <div className="report-personal-header-calender">
            <CalendarRangePickerCustom value={dateRangePicker} />
          </div>
        </div>
        <div className="report-personal-filter">
          <div
            className={
              isTeamFilter
                ? "report-personal-filter-me"
                : "report-personal-filter-me active"
            }
            onClick={() => handleFilterData(FILTER_DATA_REPORT.ME)}
          >
            Me
          </div>
          <div
            className={
              isTeamFilter
                ? "report-personal-filter-me active"
                : "report-personal-filter-me"
            }
            onClick={() => handleFilterData(FILTER_DATA_REPORT.TEAM)}
          >
            Team
          </div>
        </div>
        <div className="report-personal-bar-chart">
          <BarChartCustom data={dataBarChart} />
        </div>
        <div className="report-personal-by-project">
          <ReportPersonalList dataList={dataList} isLoading={isLoading} />
          <div className="report-personal-by-project-pie-chart">
            <PieChartCustom
              data={dataPieChart.data}
              colors={dataPieChart.colors}
              total={dataPieChart.total}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPersonal;
