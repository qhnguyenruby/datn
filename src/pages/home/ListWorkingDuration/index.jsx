import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import "./index.scss";
import ListWorkingDurationHeader from "./ListWorkingDurationHeader";
import WorkingDurationItem from "./WorkingDurationItem";

const ListWorkingDuration = ({
  listWork,
  listWorkByDay,
  projectData,
  handleClickWorking,
}) => {
  const loadingWorking = useSelector((state) => state.loadings.loadingWork);

  return (
    <>
      <ListWorkingDurationHeader />
      <div className="list-working-duration-container">
        {loadingWorking ? (
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
        ) : listWorkByDay.length ? (
          listWorkByDay.map((work, index) => (
            <WorkingDurationItem
              {...work}
              key={work.id}
              listWork={listWork}
              projectData={projectData}
              maxTime={listWorkByDay[index + 1]?.timeStart}
              minTime={listWorkByDay[index - 1]?.timeEnd}
              isLastWork={listWorkByDay.length === index + 1}
              color={work.color}
              handleClickWorking={handleClickWorking}
            />
          ))
        ) : (
          <div className="working-duration-item-empty">
            You haven't done any time on this day <PriorityHighIcon />
          </div>
        )}
      </div>
    </>
  );
};

export default ListWorkingDuration;
