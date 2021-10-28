import * as React from "react";

import useApi from "../auth/useApi";
import Row from "react-bootstrap/Row";

import "./homepage.css";

// import styles from "./styles.module.scss";

const DonationSites = (props) => {
  let distance = props.distance;
  return (
    <div className="distanceresponse">
      {distance.slice(0, 3).map((element) => {
        let distanceMiles = (
          element.distance.replace("km", "") * 0.621371
        ).toFixed(2);
        let addressforMap = element.address;
        console.log(addressforMap);
        return (
          <Row>
          <div className="distancecard">
            <h4>{element.name}</h4>
            <p>
              {element.address},{element.duration}, {distanceMiles} miles,{" "}
              {element.phone_number},{" "}
            </p>
          </div>
          </Row>
        );
      })}
    </div>
  );
};

export default DonationSites;
