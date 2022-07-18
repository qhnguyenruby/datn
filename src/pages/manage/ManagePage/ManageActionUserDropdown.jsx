import React from "react";
import "./ManageActionUserDropdown.scss";

const ManageActionUserDropdown = ({
  showModalConfirmDelete,
  user,
  showModalConfirmDeactivate,
  showModalConfirmActive,
  listChecked,
  filterMemberBy,
}) => {
  return (
    <div>
      <div className="action-dropdown">
        {user && !user.isActive && (
          <div
            className="action-dropdown-item"
            onClick={() => showModalConfirmActive([user.userId], user.userName)}
          >
            Active
          </div>
        )}
        {user?.isActive && (
          <div
            className="action-dropdown-item"
            onClick={() =>
              showModalConfirmDeactivate([user.userId], user.userName)
            }
          >
            Deactivate
          </div>
        )}
        {!user && (
          <>
            {filterMemberBy === "INACTIVE" ? (
              <div
                className="action-dropdown-item"
                onClick={() => showModalConfirmActive(listChecked)}
              >
                Active
              </div>
            ) : (
              <div
                className="action-dropdown-item"
                onClick={() => showModalConfirmDeactivate(listChecked)}
              >
                Deactivate
              </div>
            )}
          </>
        )}
        {!user ? (
          <div
            className="action-dropdown-item"
            onClick={() => showModalConfirmDelete(listChecked)}
          >
            Delete
          </div>
        ) : (
          <div
            className="action-dropdown-item"
            onClick={() => showModalConfirmDelete([user.userId], user.userName)}
          >
            Delete
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageActionUserDropdown;
