import { withHeaderHOC } from "../../components/Header/withHeaderHOC";
import ReportByMember from "../../pages/report/ReportPm/ReportByMember";

const ReportByMemberPage = () => {
  return <ReportByMember />;
};

export default withHeaderHOC(ReportByMemberPage);
