import * as React from "react";

import "./homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
    //Row 2 - Search and Filter
    <div class="container-fluid">
      <div class="row p-4 search-row">
        <div
          class="col-12 text-center"
          class="form"
          className="search add-space"
        >
          <form {...{ onSubmit }}>
            <label>
              <div class="form">
                <i class="fa fa-search"></i>
                <input
                  type="text"
                  class="form-control form-input"
                  placeholder="Search Address or Zipcode..."
                  onChange={(e) => setOrigin(e.currentTarget.value)}
                  value={origin}
                />
                <button class="btn btn-primary">Search</button>
              </div>
            </label>
          </form>
        </div>
      </div>
      {/* Row 3 - results and Map  */}
      <section class="p-0">
        <div class="container-fluid px-0">
          <div class="row g-0">
            <div class="col-md align-items-center nopadding">
              <div class="left boxed-content">
                <DonationSites distance={distance} />
              </div>
            </div>

            <div class="right col-md-6 col-lg-6 col-xs-12 boxed-content nopadding">
              <MapContainer distance={distance} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Distance;
