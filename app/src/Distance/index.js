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
    <div class="container-fluid">
      <div class="row p-4 search-row">
        <div
          class="col-12 text-center"
          class="form"
          className="search add-space"
        >
          <form {...{ onSubmit }}>
            <label>
              <i class="fas fa-search"></i>
              <input
                type="text"
                class="form-control form-input"
                placeholder="Search Address or Zipcode..."
                onChange={(e) => setOrigin(e.currentTarget.value)}
                value={origin}
              />
            </label>
            <button>Search</button>
          </form>
        </div>
      </div>
      <div class="container-fluid px-0">
        <div class="row no-gutters">
          <div class="col-md-6 col-lg-6 col-xs-12 align-items-center padding-0">
            <div class="left boxed-content">
              <DonationSites distance={distance} />
            </div>
          </div>

          <div class="right col-md-6 col-lg-6 col-xs-12 boxed-content padding-0">
            <MapContainer distance={distance} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distance;
