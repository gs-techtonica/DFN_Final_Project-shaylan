import * as React from "react";

import useApi from "../auth/useApi";

import styles from "./styles.module.scss";

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  const { loading, apiClient } = useApi();
  const [distance, setDistance] = React.useState([]);

  const loadTasks = React.useCallback(
    async () => setTasks(await apiClient.getTasks()),
    [apiClient],
  );
  const addTask = (task) => apiClient.addTask(task).then(loadTasks);

  const loadDistance = React.useCallback(
    async () => setDistance(await apiClient.getDistance()),
    [apiClient],
  );

  React.useEffect(() => {
    !loading && loadDistance();
  }, [loading, loadDistance]);

  return loading ? null : (
    <section>
      {/* <TaskList {...{ tasks }} /> */}
      <Distance {...{ distance }} />
      <AddTask {...{ addTask }} />
    </section>
  );
};

const Distance = ({ distance }) => <div>{distance}</div>;

const TaskList = ({ tasks }) => (
  <ul className={styles.list}>
    {tasks.map(({ id, name }) => (
      <li key={id}>{name}</li>
    ))}
  </ul>
);

const AddTask = ({ addTask }) => {
  const [task, setTask] = React.useState("");

  const canAdd = task !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canAdd) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        New task:{" "}
        <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
      </label>
      <button disabled={!canAdd} className={styles.button}>
        Add
      </button>
    </form>
  );
};

export default Tasks;
