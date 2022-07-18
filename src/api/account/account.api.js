import axios from "axios";
import { SERVER_API_URL } from "../../constants/common";

const login = (loginModel) => {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf8",
    },
  };
  return (
    axios
      .post(`${SERVER_API_URL}/api/Authentication/login`, loginModel, options)
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

const register = (registerModel) => {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf8",
    },
  };
  return (
    axios
      .post(
        `${SERVER_API_URL}/api/Authentication/register`,
        registerModel,
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

export const accountApi = {
  login,
  register,
};
