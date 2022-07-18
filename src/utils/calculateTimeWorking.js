/**
 * @param timeString: string; format: hh:mm AM/PM
 * @param action: string; format: earlier/later
 * @param min: number;
 */

import { OUT_DATE_EDIT_TIME } from "../constants/common";
import { ACTION_EDIT_TIME } from "../constants/common";

export const calculateTimeWorking = (timeString, action, min) => {
  const timeArray = timeString.split(" ");
  let AMorPM = timeArray[1];
  let hours = parseInt(timeArray[0].split(":")[0]);
  let mins = parseInt(timeArray[0].split(":")[1]);
  let isOutDate = false;

  if (action === ACTION_EDIT_TIME.EARLIER) {
    mins -= min;
    if (mins < 0) {
      hours -= 1;
      mins = mins + 60;

      if (hours === 0) {
        hours = 12;
      }
      if (hours === 11 && AMorPM === "AM") {
        AMorPM = "PM";
        isOutDate = OUT_DATE_EDIT_TIME.EARLIER;
      } else if (hours === 11 && AMorPM === "PM") {
        AMorPM = "AM";
      }
    }
  }

  if (action === ACTION_EDIT_TIME.LATER) {
    mins = mins + min;
    if (mins > 59) {
      hours += 1;
      mins = mins - 60;

      if (hours === 13) {
        hours = 1;
      }
      if (hours === 12 && AMorPM === "AM") {
        AMorPM = "PM";
      } else if (hours === 12 && AMorPM === "PM") {
        AMorPM = "AM";
        isOutDate = OUT_DATE_EDIT_TIME.LATER;
      }
    }
  }

  return {
    timeString: `${hours}:${mins < 10 ? "0" + mins : mins} ${AMorPM}`,
    isOutDate: isOutDate,
  };
};
