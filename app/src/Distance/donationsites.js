import * as React from "react";

import "./homepage.css";

// import styles from "./styles.module.scss";

const DonationSites = (props) => {
  let distance = props.distance;
  return (
    <div class="container">
      <div class="col">
        {distance
          .filter(
            (element) =>
              element.product_type_id == props.checkedProduct ||
              !props.checkedProduct,
          )
          .slice(0, 3)
          .map((element) => {
            let distanceMiles = (
              element.distance.replace("km", "") * 0.621371
            ).toFixed(2);
            let addressforMap = element.address;
            console.log(addressforMap);
            return (
              <div class="row my-3 justify-content-center">
                <div class="card" style={{ width: "16rem" }}>
                  <div className="distancecard">
                    <h5>{element.name}</h5>
                    <p>
                      {element.address} <br />
                      {distanceMiles} miles
                      <br />
                      {element.phone_number}{" "}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DonationSites;
