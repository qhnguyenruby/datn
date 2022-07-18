import "./index.scss";

const TaskDropdownGroup = ({
  projectName,
  client,
  projectTasks,
  handleDropdownTaskChoice,
  id,
  color,
}) => {
  return (
    <div className="task-act-dropdown-group">
      <div className="task-act-dropdown-group-name">
        <div
          className="task-act-dropdown-group-name-color"
          style={{ background: color }}
        ></div>
        <span className="task-act-dropdown-group-name-project">
          {projectName}
        </span>
        <span className="task-act-dropdown-group-name-client">({client})</span>
      </div>
      {projectTasks.map((task) => (
        <div
          className="task-act-dropdown-group-name-task"
          key={task.id}
          onClick={() =>
            handleDropdownTaskChoice({
              projectTaskName: task.taskName,
              projectName: projectName,
              projectTaskId: task.id,
              projectId: id,
              color: color,
            })
          }
        >
          {task.taskName}
        </div>
      ))}
    </div>
  );
};

export default TaskDropdownGroup;
