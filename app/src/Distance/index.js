import * as React from "react";

import useApi from "../auth/useApi";

import "./homepage.css";
import MapContainer from "./map";

// import styles from "./styles.module.scss";

const Distance = () => {
  const { loading, apiClient } = useApi();
  const [distance, setDistance] = React.useState([]);
  const [origin, setOrigin] = React.useState("");
  console.log(distance);

  const loadDistance = async () =>
    setDistance(await apiClient.getDistance(origin));

  //   React.useEffect(() => {
  //     !loading && loadDistance();
  //   }, [origin]);

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
    <div className="homepagecontainer">
      <form {...{ onSubmit }}>
        <label>
          Enter Current Address:{" "}
          <input
            onChange={(e) => setOrigin(e.currentTarget.value)}
            value={origin}
          />
        </label>
        <button>Search</button>
        <div className="mapcontainer">
          <MapContainer />
          {/* on backend before we return result, sort the array by distance. Front
        end will show order. Return just first two indexes. */}
          {/* google map react element pass addresses */}
        </div>
        <div className="distanceresponse">
          {distance.slice(0, 3).map((element) => {
            let distanceMiles = (
              element.distance.replace("km", "") * 0.621371
            ).toFixed(2);
            let addressforMap = element.address;
            console.log(addressforMap);
            return (
              <div className="distancecard">
                <h4>{element.name}</h4>
                <p>
                  {element.address},{element.duration}, {distanceMiles} miles,{" "}
                  {element.phone_number},{" "}
                </p>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default Distance;
