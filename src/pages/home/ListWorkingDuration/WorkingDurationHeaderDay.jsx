import { convertMinutesToHours } from "../../../utils/convertMinutesToHours";

const WorkingDurationHeaderDay = ({
  duration: timeData,
  isActive,
  dateTime,
  day,
  handleDayActive,
}) => {
  const duration = convertMinutesToHours(timeData);

  return (
    <div
      className={
        isActive
          ? "working-duration-header-day active"
          : "working-duration-header-day "
      }
      onClick={() => {
        handleDayActive(dateTime);
      }}
    >
      <div className="working-duration-header-day-name">{day}</div>
      <div className="working-duration-header-day-time">{duration}</div>
    </div>
  );
};

export default WorkingDurationHeaderDay;
