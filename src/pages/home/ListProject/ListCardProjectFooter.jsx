import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import { FORMAT_DATE } from "../../../constants/common";
import moment from "moment";
import { useEffect, useState } from "react";
import { convertStringToDate } from "../../../utils/convertStringToDate";
import { getWeekFromDay } from "../../../utils/getWeekFromDay";
import "./ListCardProjectFooter.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDate } from "../../../redux/slices/varSlice";

const TIME_OF_WEEK = 7 * 24 * 60 * 60 * 1000;

const ListCardProjectFooter = () => {
  const dateNow = useSelector((state) => state.vars.currentDate);
  const dispatch = useDispatch();
  // const dateNow = moment().format(FORMAT_DATE);
  const [datePicker, setDatePicker] = useState(
    convertStringToDate(dateNow, FORMAT_DATE, "-")
  );

  const [datePicked, setDatePicked] = useState(
    moment(datePicker).format(FORMAT_DATE)
  );
  const dayOfWeek = getWeekFromDay(datePicked);

  const handlePrevWeek = () => {
    setDatePicker(new Date(datePicker.getTime() - TIME_OF_WEEK));
  };

  const handleNextWeek = () => {
    setDatePicker(new Date(datePicker.getTime() + TIME_OF_WEEK));
  };

  useEffect(() => {
    const newDate = moment(datePicker).format(FORMAT_DATE);
    setDatePicked(newDate);
    dispatch(setCurrentDate(newDate));
  }, [datePicker, dispatch]);

  useEffect(() => {
    setDatePicker(convertStringToDate(dateNow, FORMAT_DATE, "-"));
  }, [dateNow]);

  return (
    <div className="list-card-project-footer">
      <div className="container">
        <div
          className="list-card-project-footer-button-back"
          onClick={handlePrevWeek}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: "12px" }} />
        </div>
        <div className="list-card-project-footer-week">{`${dayOfWeek.firstday} - ${dayOfWeek.lastday}`}</div>
        <div
          className="list-card-project-footer-button-next"
          onClick={handleNextWeek}
        >
          <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Custom input"
            value={datePicker}
            maxDate={new Date()}
            onChange={(newValue) => {
              setDatePicker(newValue);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  className="list-card-project-footer-date"
                  ref={inputRef}
                  {...inputProps}
                />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default ListCardProjectFooter;
