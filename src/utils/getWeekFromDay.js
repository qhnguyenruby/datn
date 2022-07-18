import { convertStringToDate } from "./convertStringToDate";

export const getWeekFromDay = (date) => {
  const curr = convertStringToDate(date, "dd-mm-yyyy", "-"); // get current date
  const first = curr.getDate() - curr.getDay() + 2; // First day is the day of the month - the day of the week
  const last = first + 6; // last day is the first day + 6

  const firstday = new Date(curr.setDate(first)).toUTCString();
  const lastday = new Date(curr.setDate(last)).toUTCString();
  return {
    firstday: convertDayOfWeek(firstday),
    lastday: convertDayOfWeek(lastday),
  };
};

const convertDayOfWeek = (dateString) => {
  const arrayDate = dateString.replace(",", "").split(" ");
  return `${arrayDate[0]} ${arrayDate[1]}`;
};
