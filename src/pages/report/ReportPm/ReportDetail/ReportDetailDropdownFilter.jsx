import { Menu } from "antd";
import React from "react";

const ReportDetailDropdownFilter = (data) => {
  return (
    <Menu>
      {data.map((item) => (
        <Menu.Item key={item.id}>
          <span>{item.name}</span>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default ReportDetailDropdownFilter;
