import axios from "axios";
import { SERVER_API_URL } from "../../constants/common";

const getPersonalReport = (userId, dateStart, dateEnd) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Report/getPersonalReport?userId=${userId}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
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

const getTeamReport = (userId, dateStart, dateEnd) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Report/getTeamReport?userId=${userId}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
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

const getReport = (dateStart, dateEnd) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Report/getReport?dateStart=${dateStart}&dateEnd=${dateEnd}`,
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

const getUserReport = (userId, dateStart, dateEnd) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Report/getUserReport?userId=${userId}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
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

const getUserDetailReportBy = (userId, dateStart, dateEnd, by) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Report/getUserDetailReportBy?userId=${userId}&dateStart=${dateStart}&dateEnd=${dateEnd}&by=${by}`,
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

const getProjectReport = (projectId, dateStart, dateEnd) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Report/getProjectReport?projectId=${projectId}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
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

const getProjectDetailReportBy = (projectId, dateStart, dateEnd, by) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Report/getProjectDetailReportBy?projectId=${projectId}&dateStart=${dateStart}&dateEnd=${dateEnd}&by=${by}`,
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

const getReportDetail = (
  userIds,
  projectIds,
  dateStart,
  dateEnd,
  page,
  numPerPage
) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Report/getReportDetail?userIds=${userIds}&projectIds=${projectIds}&dateStart=${dateStart}&dateEnd=${dateEnd}&page=${page}&numPerPage=${numPerPage}`,
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

const exportReportDetail = (
  userIds,
  projectIds,
  dateStart,
  dateEnd,
  page,
  numPerPage,
  by
) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Report/exportReportDetail?userIds=${userIds}&projectIds=${projectIds}&dateStart=${dateStart}&dateEnd=${dateEnd}&page=${page}&numPerPage=${numPerPage}&by=${by}`,
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

export const reportApi = {
  getPersonalReport,
  getTeamReport,
  getReport,
  getUserReport,
  getProjectReport,
  getUserDetailReportBy,
  getProjectDetailReportBy,
  getReportDetail,
  exportReportDetail,
};
