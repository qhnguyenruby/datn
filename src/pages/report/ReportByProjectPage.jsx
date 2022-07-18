import { withHeaderHOC } from "../../components/Header/withHeaderHOC";
import ReportByProject from "../../pages/report/ReportPm/ReportByProject";

const ReportByProjectPage = () => {
  return <ReportByProject />;
};

export default withHeaderHOC(ReportByProjectPage);
