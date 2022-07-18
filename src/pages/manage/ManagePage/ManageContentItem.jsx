import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditIcon from "@mui/icons-material/Edit";
import { ClickAwayListener } from "@mui/material";
import { Box } from "@mui/system";
import { Checkbox, Radio } from "antd";
import { useState } from "react";
import ManageActionUserDropdown from "./ManageActionUserDropdown";

const ROLES = {
  Admin: { color: "#2ECC71", name: "Admin", value: "ADMIN" },
  Dev: { color: "#9B59B6", name: "Development", value: "DEV" },
  PM: { color: "#FFB332", name: "Project Management", value: "PM" },
};

const ManageContentItem = ({
  user,
  showModalConfirmDelete,
  onChangeRole,
  listChecked,
  onChangeCheckbox,
  ACTION_USER,
  showModalConfirmDeactivate,
  showModalConfirmActive,
}) => {
  const [value, setValue] = useState(user.role);
  const [activeEdit, setActiveEdit] = useState(false);
  const [activeAction, setActiveAction] = useState(false);
  const isChecked = listChecked.length
    ? listChecked.find((item) => item === user.userId)
    : false;

  const onChangeRoleState = (e) => {
    onChangeRole(user.userId, e.target.value);
    setActiveEdit(false);
    setValue(e.target.value);
  };

  const classNameItem = `manage-content-container-item ${
    !user.isActive && "manage-content-container-item-inactive"
  } ${isChecked && "manage-content-container-item-checked"}`;
  return (
    <div className={classNameItem} key={user.userId}>
      <div className="manage-content-container-item-name">
        <div className="manage-content-container-item-name-action">
          <Checkbox
            checked={isChecked}
            onChange={(e) => onChangeCheckbox(user.userId, e.target.checked)}
          ></Checkbox>
          {activeAction && (
            <ClickAwayListener
              onClickAway={() => {
                setActiveAction(false);
              }}
            >
              <Box sx={{ position: "relative" }}>
                <ManageActionUserDropdown
                  ACTION_USER={ACTION_USER}
                  showModalConfirmDelete={showModalConfirmDelete}
                  user={user}
                  showModalConfirmDeactivate={showModalConfirmDeactivate}
                  showModalConfirmActive={showModalConfirmActive}
                />
              </Box>
            </ClickAwayListener>
          )}
          <ArrowDropDownIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              onChangeCheckbox(user.userId, true);
              setActiveAction(true);
            }}
          />
        </div>
        <span>{user.userName}</span>
      </div>
      <div className="manage-content-container-item-email">{user.email}</div>
      <div className="manage-content-container-item-access">
        <div className="manage-content-container-item-access-edit">
          <EditIcon
            sx={{
              height: "16px",
              width: "16px",
              color: "rgba(54, 54, 54, 0.7)",
            }}
            onClick={() => setActiveEdit(true)}
          ></EditIcon>
        </div>
        {activeEdit && (
          <ClickAwayListener
            onClickAway={() => {
              setActiveEdit(false);
            }}
          >
            <Box sx={{ position: "relative" }}>
              <div className="manage-content-container-item-access-dropdown">
                <Radio.Group onChange={onChangeRoleState} value={value}>
                  {Object.keys(ROLES).map((key, index) => (
                    <div
                      className="manage-content-container-item-access-dropdown-item"
                      key={index}
                    >
                      <Radio value={key}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div
                            className="manage-content-container-item-access-dropdown-item-color"
                            style={{ backgroundColor: ROLES[key].color }}
                          ></div>
                          <div className="manage-content-container-item-access-dropdown-item-label">
                            {ROLES[key].name}
                          </div>
                        </div>
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </Box>
          </ClickAwayListener>
        )}
        <div
          className="manage-content-container-item-access-color"
          style={{ backgroundColor: ROLES[user.role].color }}
        ></div>
        <div className="manage-content-container-item-access-role">
          {user.role}
        </div>
      </div>
    </div>
  );
};

export default ManageContentItem;
