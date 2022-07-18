import React from "react";
import { Avatar } from "@mui/material";

const MemberDropdownItem = ({
  isAdd,
  userId,
  avatarUrl,
  userName,
  email,
  isPM,
  handleClickMember,
}) => {
  return (
    <>
      {!isAdd && (
        <div
          className="new-project-team-members-body-btn-add-member-pro"
          onClick={() => {
            handleClickMember(userId, avatarUrl, userName, email, isPM);
          }}
        >
          <div className="new-project-team-members-body-btn-add-member-pro-image">
            <Avatar src={avatarUrl}></Avatar>
          </div>
          <div className="new-project-team-members-body-btn-add-member-pro-info">
            <p className="new-project-team-members-body-btn-add-member-pro-info-name">
              {userName}
            </p>
            <p className="new-project-team-members-body-btn-add-member-pro-info-email">
              {email}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberDropdownItem;
