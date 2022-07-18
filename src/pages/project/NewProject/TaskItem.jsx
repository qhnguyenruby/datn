import ClearIcon from "@mui/icons-material/Clear";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import MemberDropdownTask from "./MemberDropdownTask";
const TaskItem = ({ task, members, deleteTask, handleTaskItemUser }) => {
  const [tasks, setTasks] = useState({});
  const [taskUser, setTaskUser] = useState([]);
  const [taskMember, setTaskMember] = useState();
  const [isMemberTaskActive, setisMemberTaskActive] = useState(false);

  const handleBlurMember = () => {
    setTimeout(() => {
      setisMemberTaskActive(false);
    }, 150);
  };

  useEffect(() => {
    if (!_.isEmpty(task)) {
      const { users = [] } = task;
      setTaskUser(users);
      setTasks({
        ...task,
        isSelected: users.length === members.length,
      });
    }
  }, [task]);

  useEffect(() => {
    const mappedListMember = members.map((mem) => ({
      ...mem,
      isAdd: false,
    }));
    setTaskMember(mappedListMember);
  }, [members]);

  useEffect(() => {
    if (!_.isEmpty(taskUser)) {
      const dataFilterMember = taskMember.filter((u) =>
        taskUser.find((user) => user.userId === u.userId)
      );
      taskMember.filter((member) => {
        dataFilterMember.map((user) => {
          if (user.userId === member.userId) {
            member.isAdd = true;
          }
          return user;
        });
        return member;
      });
      setTaskUser(dataFilterMember);
    }
  }, [taskMember]);

  const hanbleClickMemberTask = (dataTaskMember) => {
    const newData = { ...dataTaskMember, isAdd: true };
    const newTaskUser = [...taskUser, newData];
    setTaskUser(newTaskUser);
    handleTaskItemUser({
      ...tasks,
      users: newTaskUser,
      isSelected: newTaskUser.length === members.length,
    });
    setTaskMember(
      taskMember.map((item) => {
        if (item.userId === dataTaskMember.userId) {
          item.isAdd = true;
        }
        return item;
      })
    );
  };

  const deleteMemberTask = (userId) => {
    const newMemberTask = tasks.users.filter(
      (member) => member.userId !== userId
    );
    setTaskUser([...newMemberTask]);
    handleTaskItemUser({
      ...tasks,
      users: newMemberTask,
      isSelected: newMemberTask.length === members.length,
    });
    setTaskMember(
      taskMember.map((item) => {
        if (item.userId === userId) {
          item.isAdd = false;
        }
        return item;
      })
    );
  };

  const handleAllMemberTask = (event) => {
    let checked = event.target.checked;
    tasks.isSelected = checked;
    const updateMember = taskMember.map((member) => ({
      ...member,
      isAdd: true,
    }));
    const updateMemberFalse = taskMember.map((member) => ({
      ...member,
      isAdd: false,
    }));
    if (tasks.isSelected) {
      setTaskMember(updateMember);
      setTaskUser(updateMember);
      handleTaskItemUser({
        ...tasks,
        users: updateMember,
        isSelected: updateMember.length === members.length,
      });
    } else {
      setTaskMember(updateMemberFalse);
      setTaskUser([]);
      handleTaskItemUser({
        ...tasks,
        users: [],
        isSelected: false,
      });
    }
  };
  return (
    <tr className="row" key={task.id}>
      <td style={{ width: "58px" }}>
        <ClearIcon
          onClick={() => deleteTask(task.id)}
          className="row-icon-clear"
        />
      </td>
      <td className="row-task">
        <p className="row-task-tilte" name="name">
          {task.taskName}
        </p>
      </td>
      <td className="row-3">
        <div className="row-3-check">
          <input
            type="checkbox"
            className="row-3-check-icon"
            onChange={(event) => {
              handleAllMemberTask(event);
            }}
            checked={tasks.isSelected}
          />
          <p className="row-3-check-text">Anyone</p>
        </div>
        <div className="row-3-info">
          {taskUser.map((mem) => (
            <div className="row-3-info-member" key={mem.userId}>
              <p className="row-3-info-member-name">{mem.userName}</p>
              <ClearIcon
                onClick={() => deleteMemberTask(mem.userId)}
                className="row-3-info-member-icon-clear"
              />
            </div>
          ))}

          <div className="row-3-info-add">
            <button
              className="row-3-info-add-button"
              onFocus={() => setisMemberTaskActive(true)}
              onBlur={handleBlurMember}
            >
              Add a member...
            </button>
            {isMemberTaskActive && (
              <div className="row-3-info-add-member">
                {taskMember.map((memb, index) => (
                  <MemberDropdownTask
                    key={memb.userId}
                    hanbleClickMemberTask={hanbleClickMemberTask}
                    {...memb}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TaskItem;
