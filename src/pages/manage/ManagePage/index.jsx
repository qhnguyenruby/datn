import { ExclamationCircleOutlined } from "@ant-design/icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Checkbox,
  CircularProgress,
  ClickAwayListener,
  FormControl,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Divider, Modal, Pagination, Select } from "antd";
import _ from "lodash";
import Notification from "../../../components/Form/Notification";
import { useEffect, useState } from "react";
import "./index.scss";
import ManageActionUserDropdown from "./ManageActionUserDropdown";
import ManageContentItem from "./ManageContentItem";
import { userApi } from "../../../api/user/user.api";
import jwtDecode from "jwt-decode";

const { confirm } = Modal;
const { Option } = Select;

const FILTER_MEMBER_BY = {
  ALL: "ALL",
  Dev: "Dev",
  Admin: "Admin",
  PM: "PM",
  INACTIVE: "INACTIVE",
};

const ACTION_USER = {
  ACTIVE: "active",
  DEACTIVATE: "deactivate",
  DELETE: "delete",
};
const PAGE_SIZE = 10;

const ManagePage = () => {
  const [dataUser, setDataUser] = useState([]);
  const [dataUserFiltered, setDataUserFiltered] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [filterMemberBy, setFilterMemberBy] = useState(FILTER_MEMBER_BY.ALL);
  const [inviteInput, setInviteInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [listChecked, setListChecked] = useState([]);
  const [activeActionAll, setActiveActionAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const idUser = jwtDecode(localStorage.getItem("token")).id;
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  const showModalConfirmDelete = (ids, name) => {
    confirm({
      centered: true,
      title: "Delete user",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete user ${
        name ? `"${name}"` : "selected"
      }?`,
      async onOk() {
        const res = await userApi.deleteUser(ids.join("&userIds="));
        if (res.status === 200) {
          const newDataUser = deleteUser(ids, dataUser);
          setDataUser(newDataUser);
        }
      },
      onCancel() {},
    });
  };

  const showModalConfirmActive = (ids, name) => {
    confirm({
      centered: true,
      title: "Active user",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to active user ${
        name ? `"${name}"` : "selected"
      }?`,
      async onOk() {
        const res = await userApi.activeUser(ids.join("&userIds="));
        if (res.status === 200) {
          const newDataUser = activeUser(ids, dataUser);
          setDataUser(newDataUser);
        }
      },
      onCancel() {},
    });
  };
  const showModalConfirmDeactivate = (ids, name) => {
    confirm({
      centered: true,
      title: "Deactivate user",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to deactivate user ${
        name ? `"${name}"` : "selected"
      }?`,
      async onOk() {
        const res = await userApi.deactiveUser(ids.join("&userIds="));

        if (res.status === 200) {
          const newDataUser = deactivateUser(ids, dataUser);
          setDataUser(newDataUser);
        }
      },
      onCancel() {},
    });
  };

  const deleteUser = (ids, data) => {
    return data.filter((item) => !ids.includes(item.userId));
  };

  const activeUser = (ids, data) => {
    return data.map((item) =>
      ids.includes(item.userId) ? { ...item, isActive: true } : item
    );
  };

  const deactivateUser = (ids, data) => {
    return data.map((item) =>
      ids.includes(item.userId) ? { ...item, isActive: false } : item
    );
  };

  useEffect(() => {
    const dataUserActive = dataUser.filter((user) => user.isActive === true);
    if (filterMemberBy === FILTER_MEMBER_BY.ALL) {
      setDataUserFiltered(dataUserActive);
    } else if (filterMemberBy === FILTER_MEMBER_BY.INACTIVE) {
      const dataUserInactive = dataUser.filter(
        (user) => user.isActive === false
      );
      setDataUserFiltered(dataUserInactive);
    } else {
      const newDataUser = dataUserActive.filter(
        (user) => user.role === filterMemberBy
      );
      setDataUserFiltered(newDataUser);
    }
    setListChecked([]);
  }, [dataUser, filterMemberBy]);

  useEffect(() => {
    const fetchDataUser = async () => {
      setIsLoading(true);
      const res = await userApi.getAllUsers(
        idUser,
        searchInput,
        currentPage,
        PAGE_SIZE
      );
      setIsLoading(false);
      setDataUser(res.data.resultObj.searchData);
      setTotalPage(res.data.resultObj.userAmount);
    };
    const onChangeSearchInputDelay = _.debounce(fetchDataUser, 500);
    onChangeSearchInputDelay();
    return onChangeSearchInputDelay.cancel;
  }, [searchInput, idUser, currentPage]);

  const onChangeRole = async (id, role) => {
    const res = await userApi.updateUserRole(id, role);
    if (res.status === 200) {
      setNotify({
        isOpen: true,
        message: "Update role successfully",
        type: "success",
      });
      const newData = dataUser.map((user) => {
        if (user.userId === id) {
          return {
            ...user,
            role: role,
          };
        }
        return user;
      });
      setDataUser(newData);
    }
  };

  const onChangeCheckbox = (id, action) => {
    if (action) {
      const newListChecked = [...listChecked];
      newListChecked.push(id);
      setListChecked(newListChecked);
    } else {
      const newListChecked = listChecked.filter((item) => item !== id);
      setListChecked(newListChecked);
    }
  };

  const sendInvitation = async () => {
    const res = await userApi.sendInvitation(inviteInput);
    if (res.status === 200) {
      setInviteInput("");
      setNotify({
        isOpen: true,
        message: "Send invitation successfully",
        type: "success",
      });
    }
  };

  return (
    <div className="manage-container">
      <div className="manage">
        <div className="manage-header">
          <div className="manage-header-title">Admin</div>
          <div className="manage-header-invite">
            <div className="manage-header-invite-input">
              <TextField
                id="standard-basic"
                label="Add new members by email address..."
                variant="standard"
                value={inviteInput}
                sx={{ width: "320px" }}
                onChange={(event) => {
                  setInviteInput(event.target.value);
                }}
              />
            </div>
            <button
              className="manage-header-invite-button"
              onClick={sendInvitation}
            >
              Invite
            </button>
          </div>
        </div>
        <div className="manage-content">
          <div className="manage-content-search">
            <FormControl variant="standard">
              <Input
                id="input-with-icon-adornment"
                placeholder="Search by note"
                onChange={(event) => {
                  setCurrentPage(1);
                  setSearchInput(event.target.value);
                }}
                sx={{ border: "none" }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 24 }} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className="manage-content-header">
            <div className="manage-content-header-filter">
              <div
                className="manage-content-header-filter-action"
                style={{ display: listChecked.length ? "flex" : "none" }}
              >
                <Checkbox
                  checked={listChecked.length ? true : false}
                  onChange={(e) => setListChecked([])}
                  style={{ paddingRight: 0 }}
                ></Checkbox>
                {activeActionAll && (
                  <ClickAwayListener
                    onClickAway={() => {
                      setActiveActionAll(false);
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <ManageActionUserDropdown
                        showModalConfirmDelete={showModalConfirmDelete}
                        showModalConfirmDeactivate={showModalConfirmDeactivate}
                        showModalConfirmActive={showModalConfirmActive}
                        listChecked={listChecked}
                        filterMemberBy={filterMemberBy}
                      />
                    </Box>
                  </ClickAwayListener>
                )}
                <ArrowDropDownIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setActiveActionAll(true);
                  }}
                />
              </div>
              <span className="manage-content-header-filter-label">Name</span>
              <Select
                showSearch
                bordered={false}
                optionFilterProp="children"
                onChange={(value) => setFilterMemberBy(value)}
                defaultValue={filterMemberBy}
                style={{
                  color: "#363636",
                  fontFamily: "Lato",
                  fontSize: "16px",
                  width: "140px",
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value={FILTER_MEMBER_BY.ALL}>All member</Option>
                <Option value={FILTER_MEMBER_BY.Dev}>Developer</Option>
                <Option value={FILTER_MEMBER_BY.PM}>PM</Option>
                <Option value={FILTER_MEMBER_BY.Admin}>Admin</Option>
                <Option disabled>
                  <Divider style={{ margin: "8px 0" }} />
                </Option>
                <Option value={FILTER_MEMBER_BY.INACTIVE}>Inactive</Option>
              </Select>
            </div>
            <span className="manage-content-header-label-email">Email</span>
            <span className="manage-content-header-label-access">Role</span>
          </div>
          <div className="manage-content-container">
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "64px",
                  marginBottom: "100px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              dataUserFiltered.map((item) => (
                <ManageContentItem
                  user={item}
                  showModalConfirmDelete={showModalConfirmDelete}
                  onChangeRole={onChangeRole}
                  key={item.userId}
                  listChecked={listChecked}
                  onChangeCheckbox={onChangeCheckbox}
                  ACTION_USER={ACTION_USER}
                  showModalConfirmDeactivate={showModalConfirmDeactivate}
                  showModalConfirmActive={showModalConfirmActive}
                />
              ))
            )}
            <div className="manage-content-pagination">
              <Pagination
                onChange={(page) => {
                  setCurrentPage(page);
                }}
                current={currentPage}
                total={totalPage}
                pageSize={PAGE_SIZE}
                hideOnSinglePage={true}
              />
            </div>
          </div>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify}></Notification>
    </div>
  );
};

export default ManagePage;
