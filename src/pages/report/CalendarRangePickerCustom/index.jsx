import { DatePicker, Space } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { setReportDateRange } from "../../../redux/slices/reportDateRangeSlice";

const { RangePicker } = DatePicker;

const RANGES = {
  "Last Week": [
    moment().subtract(1, "isoWeek").startOf("isoWeek"),
    moment().subtract(1, "isoWeek").endOf("isoWeek"),
  ],
  "This Week": [moment().startOf("isoWeek"), moment()],
  "Last Month": [
    moment().subtract(1, "month").startOf("month"),
    moment().subtract(1, "month").endOf("month"),
  ],
  "This Month": [moment().startOf("month"), moment()],
  "Last Year": [
    moment().subtract(1, "year").startOf("year"),
    moment().subtract(1, "year").endOf("year"),
  ],
  "This Year": [moment().startOf("year"), moment()],
};

const CalendarRangePickerCustom = ({ value, bordered, suffixIcon }) => {
  const dispatch = useDispatch();
  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        onChange={(value) => {
          dispatch(setReportDateRange(value));
        }}
        value={value}
        ranges={RANGES}
        disabledDate={(d) => !d || d.isAfter(moment())}
        bordered={bordered}
        suffixIcon={suffixIcon}
        allowClear={false}
      />
    </Space>
  );
};

export default CalendarRangePickerCustom;
