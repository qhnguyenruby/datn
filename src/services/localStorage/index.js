const TOKEN_KEY = "token";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

const WORK_RUNNING_KEY = "work-tracking";
export const getWorkRunning = () => localStorage.getItem(WORK_RUNNING_KEY);
export const setWorkRunning = (Work) =>
  localStorage.setItem(WORK_RUNNING_KEY, Work);
export const removeWorkRunning = () =>
  localStorage.removeItem(WORK_RUNNING_KEY);
