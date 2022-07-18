import { DownOutlined } from "@ant-design/icons";
import { Select } from "antd";
import CalendarRangePickerCustom from "../../CalendarRangePickerCustom";
import { PAGE_URLS } from "../../../../constants/common";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.scss";

const { Option } = Select;

const SearchReportPm = ({ projectId, memberId, dateRangePicker }) => {
  const [valueProject, setValueProject] = useState(projectId);
  const [valueMember, setValueMember] = useState(memberId);
  const projectData = useSelector((state) => state.reportPageData.listProject);
  const memberData = useSelector((state) => state.reportPageData.listUser);

  const onChangeValueProject = (value) => {
    setValueProject(value);
  };
  const onChangeValueMember = (value) => {
    setValueMember(value);
  };

  return (
    <div className="report-pm-search">
      <div className="report-pm-search-time">
        <div className="report-pm-search-time-label">When</div>
        <CalendarRangePickerCustom
          bordered={false}
          value={dateRangePicker}
          suffixIcon={
            <DownOutlined style={{ fontSize: "12px", marginLeft: 70 }} />
          }
        />
      </div>
      <div className="report-pm-search-project">
        <div className="report-pm-search-project-label">What</div>
        <Select
          bordered={false}
          style={{ width: "100%" }}
          showSearch
          placeholder="Project..."
          optionFilterProp="children"
          onChange={onChangeValueProject}
          value={valueProject}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {projectData?.map((project) => (
            <Option value={project.id} key={project.id}>
              {`${project.projectName} (${project.client})`}
            </Option>
          ))}
        </Select>
      </div>
      <div className="report-pm-search-member">
        <div className="report-pm-search-member-label">Who</div>
        <Select
          bordered={false}
          style={{ width: "100%" }}
          showSearch
          placeholder="Team member..."
          optionFilterProp="children"
          onChange={onChangeValueMember}
          value={valueMember}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {memberData?.map((member) => (
            <Option value={member.userId} key={member.userId}>
              {member.userName}
            </Option>
          ))}
        </Select>
      </div>
      <Link
        to={{
          pathname: `${PAGE_URLS.REPORT}/${PAGE_URLS.REPORT_DETAIL}`,
        }}
        state={{ projectId: valueProject, memberId: valueMember }}
      >
        <div className="report-pm-search-run">Run report</div>
      </Link>
    </div>
  );
};

export default SearchReportPm;
