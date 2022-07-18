import {
  ACTION_EDIT_TIME,
  FORMAT_DATE,
  FORMAT_TIME,
  OUT_DATE_EDIT_TIME,
} from "../../../constants/common";
import moment from "moment";
import { useEffect, useState } from "react";
import { calculateTimeWorking } from "../../../utils/calculateTimeWorking";
import "./EditTimeWorking.scss";

const TIME_VALUE = [5, 10, 15, 30];

const EditTimeWorking = ({
  handleEditTime,
  timeWork,
  where,
  minTime,
  maxTime,
  isLastWork,
}) => {
  const dateCrr = "2020-06-01";
  const [maxTimeCompare, setMaxTimeCompare] = useState(maxTime);

  const compareTwoTime = (currentTime, timeCompare, isOutDate) => {
    if (isOutDate === OUT_DATE_EDIT_TIME.EARLIER) return true;
    if (isOutDate === OUT_DATE_EDIT_TIME.LATER) return false;
    const currentTimeFormat = moment(currentTime, FORMAT_TIME);
    const timeCompareFormat = moment(timeCompare, FORMAT_TIME);
    return currentTimeFormat.isBefore(timeCompareFormat);
  };

  useEffect(() => {
    const timeNow = moment();
    if (dateCrr === timeNow.format(FORMAT_DATE) && isLastWork) {
      setMaxTimeCompare(timeNow.format(FORMAT_TIME));
    }
  }, [dateCrr, isLastWork]);

  const handleEditStatus = (time, action, timeCompare) => {
    const timeWorkCalculate = calculateTimeWorking(timeWork, action, time);
    const newTimeWork = timeWorkCalculate.timeString;
    const isOutDate = timeWorkCalculate.isOutDate;
    const isDisable = compareTwoTime(newTimeWork, timeCompare, isOutDate);
    return {
      newTimeWork,
      isOutDate,
      isDisable,
    };
  };

  return (
    <div className="edit-time-working">
      <div className="edit-time-working-earlier">
        <div className="edit-time-working-earlier-label">EARLIER</div>
        {TIME_VALUE.map((time, index) => {
          return (
            <div
              className={
                handleEditStatus(time, ACTION_EDIT_TIME.EARLIER, minTime)
                  .isDisable
                  ? "edit-time-working-earlier-time edit-time-working-earlier-disable"
                  : "edit-time-working-earlier-time"
              }
              onClick={() => {
                if (
                  handleEditStatus(time, ACTION_EDIT_TIME.EARLIER, minTime)
                    .isDisable
                )
                  return;
                handleEditTime(
                  where,
                  handleEditStatus(time, ACTION_EDIT_TIME.EARLIER, minTime)
                    .newTimeWork
                );
              }}
              key={index}
            >
              <div className="edit-time-working-earlier-time-choice">
                {time} min
              </div>
              <div className="edit-time-working-earlier-time-at">
                at{" "}
                {
                  handleEditStatus(time, ACTION_EDIT_TIME.EARLIER, minTime)
                    .newTimeWork
                }
              </div>
            </div>
          );
        })}
      </div>
      <div className="edit-time-working-separate"></div>
      <div className="edit-time-working-later">
        <div className="edit-time-working-later-label">LATER</div>
        {TIME_VALUE.map((time, index) => {
          return (
            <div
              className={
                !handleEditStatus(time, ACTION_EDIT_TIME.LATER, maxTimeCompare)
                  .isDisable
                  ? "edit-time-working-later-time edit-time-working-later-disable"
                  : "edit-time-working-later-time"
              }
              onClick={() => {
                if (
                  !handleEditStatus(
                    time,
                    ACTION_EDIT_TIME.LATER,
                    maxTimeCompare
                  ).isDisable
                )
                  return;
                handleEditTime(
                  where,
                  handleEditStatus(time, ACTION_EDIT_TIME.LATER, maxTimeCompare)
                    .newTimeWork
                );
              }}
              key={index}
            >
              <div className="edit-time-working-later-time-choice">
                {time} min
              </div>
              <div className="edit-time-working-later-time-at">
                at
                {
                  handleEditStatus(time, ACTION_EDIT_TIME.LATER, maxTimeCompare)
                    .newTimeWork
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditTimeWorking;
