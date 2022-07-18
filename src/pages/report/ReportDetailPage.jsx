import { withHeaderHOC } from "../../components/Header/withHeaderHOC";
import ReportDetail from "../../pages/report/ReportPm/ReportDetail";

const ReportDetailPage = () => {
  return <ReportDetail />;
};

export default withHeaderHOC(ReportDetailPage);
