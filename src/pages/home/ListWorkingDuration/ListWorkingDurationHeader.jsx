import { useEffect, useState } from "react";
// import WorkingService from "services/WorkingService";
import { convertMinutesToHours } from "../../../utils/convertMinutesToHours";
import "./ListWorkingDurationHeader.scss";
import WorkingDurationHeaderDay from "./WorkingDurationHeaderDay";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  getTimeEntriesByDate,
  getWorkingHourByDate,
} from "../../../redux/action/timeEntryAction";
import Moment from "moment";
import { setCurrentDate } from "../../../redux/slices/varSlice";
import { setWorkingLoading } from "../../../redux/slices/loadingSlice";

const ListWorkingDurationHeader = () => {
  const dispatch = useDispatch();
  const timeEntryState = useSelector((state) => state.time_entry);
  const [totalTime, setTotalTime] = useState();
  // const [days, setDays] = useState(timeEntryState.workingHours);
  // const [days, setDays] = useState([
  //   { time: 1, dateData: "Mon 30-05-2022" },
  //   { time: 2, dateData: "Tue 31-05-2022" },
  //   { time: 3, dateData: "Wed 01-06-2022" },
  //   { time: 123, dateData: "Thu 02-06-2022" },
  //   { time: 0, dateData: "Fri 03-06-2022" },
  //   { time: 0, dateData: "Sat 04-06-2022" },
  //   { time: 0, dateData: "Sun 05-06-2022" },
  // ]);

  // const current = new Date();
  const dateActive = useSelector((state) => state.vars.currentDate);

  const handleDayActive = (date) => {
    // setDateActive(date);
    dispatch(setCurrentDate(date));
    dispatch(setWorkingLoading(true));
  };

  useEffect(() => {
    // if (!dateActive) {
    //   handleDayActive(
    //     `${current.getDate()}-${
    //       current.getMonth() + 1
    //     }-${current.getFullYear()}`
    //   );
    // }

    const fetchData = async () => {
      await dispatch(getWorkingHourByDate(dateActive));
      dispatch(getTimeEntriesByDate(dateActive));
    };
    fetchData();
    dispatch(setWorkingLoading(false));
    // setDays(timeEntryState.workingHours);
  }, [dateActive]);

  useEffect(() => {
    const totalTime = timeEntryState.workingHours.reduce(
      (previousValue, currentValue) => {
        return previousValue + currentValue.duration;
      },
      0
    );
    const newTotalTime = convertMinutesToHours(totalTime);
    setTotalTime(newTotalTime);
  }, [timeEntryState.workingHours]);

  const convertDate = (dateData) => {
    const arrayDate = dateData.split(" ");
    return {
      day: arrayDate[0],
      date: arrayDate[1],
    };
  };

  return (
    <header className="working-duration-header">
      {timeEntryState.workingHours.map((day, index) => (
        <WorkingDurationHeaderDay
          key={index}
          dateTime={convertDate(day.date).date}
          day={convertDate(day.date).day}
          isActive={dateActive === convertDate(day.date).date}
          handleDayActive={handleDayActive}
          {...day}
        />
      ))}
      <div className="working-duration-header-total">
        <div className="working-duration-header-total-label">Total</div>
        <div className="working-duration-header-total-time">{totalTime}</div>
      </div>
    </header>
  );
};

export default ListWorkingDurationHeader;
