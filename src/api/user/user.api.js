import axios from "axios";
import { SERVER_API_URL } from "../../constants/common";

const getAllUser = (userId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(`${SERVER_API_URL}/api/User/getAllUser?userId=${userId}`, config)
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
const getAllUsers = (userId, search, page, numPerPage) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (
    axios
      .get(
        `${SERVER_API_URL}/api/User/getAllUsers?userId=${userId}&search=${search}&page=${page}&numPerPage=${numPerPage}`,
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

const getUserById = (userId) => {
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
      .get(`${SERVER_API_URL}/api/User/getUserById?userId=${userId}`, options)
      // .then((res) => res.json())
      .then((res) => {
        // if (res.status === 200) {
        //   // localStorage.setItem("token", res.data.token);
        // }
        return res;
      })
      .catch((err) => {
        console.error(err);
        return { data: null, status: 400 };
      })
  );
};

const activeUser = (userIds) => {
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
        `${SERVER_API_URL}/api/User/activeUser?userIds=${userIds}`,
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

const deactiveUser = (userIds) => {
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
        `${SERVER_API_URL}/api/User/deactiveUser?userIds=${userIds}`,
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

const deleteUser = (userIds) => {
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
        `${SERVER_API_URL}/api/User/deleteUser?userIds=${userIds}`,
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

const updateUserRole = (userId, role) => {
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
        `${SERVER_API_URL}/api/User/updateUserRole?userId=${userId}&role=${role}`,
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

const sendInvitation = (email) => {
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
        `${SERVER_API_URL}/api/User/sendInvitation?emailAddress=${email}`,
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

export const userApi = {
  getAllUser,
  getAllUsers,
  getUserById,
  activeUser,
  deactiveUser,
  updateUserRole,
  sendInvitation,
  deleteUser,
};
