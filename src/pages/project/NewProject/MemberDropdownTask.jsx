import React from "react";
import { Avatar } from "@mui/material";

const MemberDropdownTask = ({
  isAdd,
  userId,
  avatarUrl,
  userName,
  email,
  isPM,
  hanbleClickMemberTask,
}) => {
  const dataTaskMember = {
    isAdd,
    userId,
    avatarUrl,
    userName,
    email,
    isPM,
  };
  return (
    <>
      {!isAdd && (
        <div
          className="new-project-team-members-body-btn-add-member-pro"
          onClick={() => {
            hanbleClickMemberTask(dataTaskMember);
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

export default MemberDropdownTask;
