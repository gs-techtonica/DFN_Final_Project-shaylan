import * as React from "react";

import useApi from "../auth/useApi";

// import styles from "./styles.module.scss";

const Distance = () => {
  const { loading, apiClient } = useApi();
  const [distance, setDistance] = React.useState([]);
  const [origin, setOrigin] = React.useState("");

  const loadDistance = async () =>
    setDistance(await apiClient.getDistance(origin));

  React.useEffect(() => {
    !loading && loadDistance();
  }, [loading, loadDistance]);

  const onSubmit = (e) => {
    e.preventDefault();
    loadDistance();
  };

  // const canAdd = origin !== "";

  // const onSubmit = (e) => {
  //     e.preventDefault();
  //     if (canAdd) {
  //         addOrigin(origin);
  //         setOrigin("");
  //     }
  // };

  return loading ? null : (
    <form {...{ onSubmit }}>
      <label>
        Enter Current Address:{" "}
        <input
          onChange={(e) => setOrigin(e.currentTarget.value)}
          value={origin}
        />
      </label>
      <button>Add</button>
      <div>{distance.duration}</div>
      <div>{distance.distance}</div>
    </form>
  );
};

export default Distance;
