import { Grid } from "@mui/material";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import "./Tasks.scss";

const Tasks = ({ members, handleByNameAndUserID, editTask }) => {
  const [taskDatas, setTaskDatas] = useState([]);
  const [taskUser, settaskUser] = useState([]);

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setTaskDatas([
        ...taskDatas,
        {
          id: Math.floor(Math.random() * 20) + 10,
          taskName: e.target.value,
          users: [],
        },
      ]);
      e.target.value = "";
    }
  };

  useEffect(() => {
    if (!_.isEmpty(editTask)) {
      const { projectTasks = [] } = editTask;
      setTaskDatas(projectTasks);
    }
  }, [editTask]);

  useEffect(() => {
    handleByNameAndUserID(taskDatas);
  }, [taskDatas, handleByNameAndUserID]);

  const handleTaskItemUser = (item) => {
    const { id, users = [] } = item;
    debugger;
    const mappedTasksData = taskDatas.map((data) => {
      return data.id === id ? { ...data, users } : data;
    });
    settaskUser(item);
    setTaskDatas(mappedTasksData);
  };

  const deleteTask = (id) => {
    const newTask = taskDatas.filter((task) => task.id !== id);
    setTaskDatas([...newTask]);
  };
  return (
    <div className="new-project-tasks">
      <div className="new-project-tasks-title">
        <h3 className="new-project-tasks-title-name">Tasks</h3>
      </div>
      <Grid container className="new-project-tasks-body">
        <table className="new-project-tasks-body-table">
          <tbody>
            <tr className="row">
              <th className="row--1" />
              <th className="row-0" />
              <th className="row-1">Visible to</th>
            </tr>
            {taskDatas.map((task, index) => (
              <TaskItem
                task={task}
                key={task.id}
                members={members}
                deleteTask={deleteTask}
                handleTaskItemUser={handleTaskItemUser}
              />
            ))}
          </tbody>
        </table>
        <div className="new-project-tasks-body-btn">
          <div className="new-project-tasks-body-btn-add">
            <input
              type="text"
              placeholder=" Add more task..."
              className="new-project-tasks-body-btn-add-more"
              onKeyDown={_handleKeyDown}
            ></input>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default Tasks;
