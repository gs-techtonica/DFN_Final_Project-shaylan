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
    <Container>
      <div>
        <div className="search">
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
        <Row>
          <Col>
            <DonationSites distance={distance} />
          </Col>

          <Col>
            <MapContainer distance={distance} />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Distance;
