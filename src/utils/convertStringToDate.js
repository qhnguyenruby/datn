export const convertStringToDate = (date, format, delimiter) => {
  const formatLowerCase = format.toLowerCase();
  const formatItems = formatLowerCase.split(delimiter);
  const dateItems = date.split(delimiter);
  const monthIndex = formatItems.indexOf("mm");
  const dayIndex = formatItems.indexOf("dd");
  const yearIndex = formatItems.indexOf("yyyy");
  let month = parseInt(dateItems[monthIndex]);
  month -= 1;
  const formatedDate = new Date(
    dateItems[yearIndex],
    month,
    dateItems[dayIndex]
  );
  return formatedDate;
};
