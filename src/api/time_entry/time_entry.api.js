import axios from "axios";
import { SERVER_API_URL } from "../../constants/common";

const getWorkingHourByDate = (userId, date) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/TimeEntry/getWorkingHourByDate?userId=${userId}&date=${date}`,
        config
      )
      // .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          // localStorage.setItem("token", res.data.token);
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
        return { data: null, status: 400 };
      })
  );
};
const getUserTimeEntry = (userId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/TimeEntry/getUserTimeEntry?userId=${userId}`,
        config
      )
      // .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          // localStorage.setItem("token", res.data.token);
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
        return { data: null, status: 400 };
      })
  );
};
const getTimeEntriesByDate = (userId, date) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/TimeEntry/getTimeEntriesByDate?userId=${userId}&date=${date}`,
        config
      )
      // .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          // localStorage.setItem("token", res.data.token);
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
        return { data: null, status: 400 };
      })
  );
};

const addTimeEntry = (newTaskTimeEntryInfo) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf8",
      Authorization: `Bearer ${token}`,
    },
  };
  return (
    axios
      .post(
        `${SERVER_API_URL}/api/TimeEntry/addTimeEntry`,
        newTaskTimeEntryInfo,
        options
      )
      // .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          // localStorage.setItem("token", res.data.token);
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
        return { data: null, status: 400 };
      })
  );
};

const deleteTimeEntry = (userId, timeEntryId) => {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      // Accept: "application/json",
      // "Content-Type": "application/json; charset=utf8",
      Authorization: `Bearer ${token}`,
    },
  };
  return (
    axios
      .post(
        `${SERVER_API_URL}/api/TimeEntry/deleteTimeEntry?timeEntryId=${timeEntryId}&userId=${userId}`,
        {},
        options
      )
      // .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          // localStorage.setItem("token", res.data.token);
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
        return { data: null, status: 400 };
      })
  );
};

export const timeEntryApi = {
  getWorkingHourByDate,
  getTimeEntriesByDate,
  getUserTimeEntry,
  addTimeEntry,
  deleteTimeEntry,
};
