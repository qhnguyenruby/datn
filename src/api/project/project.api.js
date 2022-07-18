import axios from "axios";
import { SERVER_API_URL } from "../../constants/common";

const getWorkingProject = (userId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Project/getWorkingProject?userId=${userId}`,
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

const getPMProject = (userId, search, page, numPerPage) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Project/getPMProject?userId=${userId}&search=${search}&page=${page}&numPerPage=${numPerPage}`,
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

const getPMProjectAmount = (userId, name) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Project/getPMProjectAmount?userId=${userId}&search=${name}`,
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

const getProjectEditDetail = (userId, projectId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Project/getProjectEditDetail?userId=${userId}&projectId=${projectId}`,
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
const getPMProjectDetail = (userId, projectId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/Project/getPMProjectDetail?userId=${userId}&projectId=${projectId}`,
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

const createNewProject = (userId, newProjectInfo) => {
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
        `${SERVER_API_URL}/api/Project/createProject?userId=${userId}`,
        newProjectInfo,
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

const editProject = (userId, newProjectInfo) => {
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
        `${SERVER_API_URL}/api/Project/editProject?userId=${userId}`,
        newProjectInfo,
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
const archiveAProject = (userId, projectId) => {
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
        `${SERVER_API_URL}/api/Project/archiveAProject?userId=${userId}&projectId=${projectId}`,
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
const unarchiveAProject = (userId, projectId) => {
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
        `${SERVER_API_URL}/api/Project/unarchiveAProject?userId=${userId}&projectId=${projectId}`,
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

const deleteProject = (userId, projectId) => {
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
        `${SERVER_API_URL}/api/Project/deleteProject?userId=${userId}&projectId=${projectId}`,
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

export const projectApi = {
  getWorkingProject,
  getPMProjectDetail,
  getProjectEditDetail,
  createNewProject,
  editProject,
  getPMProject,
  getPMProjectAmount,
  archiveAProject,
  unarchiveAProject,
  deleteProject,
};
