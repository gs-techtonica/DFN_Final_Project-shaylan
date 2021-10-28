import * as React from "react";

import "./homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import useApi from "../auth/useApi";

import DonationSites from "./donationsites";
import MapContainer from "./map";

// import styles from "./styles.module.scss";

const Distance = () => {
  const { loading, apiClient } = useApi();
  const [origin, setOrigin] = React.useState("");
  const [distance, setDistance] = React.useState([]);

  const loadDistance = async () =>
    setDistance(await apiClient.getDistance(origin));

  const onSubmit = (e) => {
    e.preventDefault();
    loadDistance();
  };

  return loading ? null : (
    <div class="container">
      <div class="row">
        <div className="search add-space">
          <form {...{ onSubmit }}>
            <label>
              Enter Current Address:{" "}
              <input
                onChange={(e) => setOrigin(e.currentTarget.value)}
                value={origin}
              />
            </label>
            <button>Search</button>
          </form>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col align-items-center">
            <div class="boxed-content">
              <DonationSites distance={distance} />
            </div>
          </div>

          <div class="col boxed-content">
            <MapContainer distance={distance} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distance;
