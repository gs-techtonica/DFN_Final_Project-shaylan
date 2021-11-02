import * as React from "react";

import { NavLink, Routes, Route } from "react-router-dom";

import Distance from "../Distance";
import Donation from "../Donation";
import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import { Login, Logout, Protected } from "../auth/widgets";

import "../global.css";

const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const { loading, apiClient } = useApi();

  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      apiClient.addOrUpdateUser(user);
    }
  }, [isAuthenticated, user, loading, apiClient]);

  return (
    <>
      <header className="add-space">
        <nav class="navbar navbar-expand-md navbar-light bg-light navbar-fixed-top">
          <div class="container-fluid">
            <Auth />{" "}
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                  <NavLink to="/" end>
                    Home
                  </NavLink>
                </li>
                <li class="nav-item">
                  | <NavLink to="donation"> Make a Donation</NavLink>
                </li>
                <li class="nav-item">| About Us </li>
                <li class="nav-item">| Donations Tracker</li>
                <li class="nav-item">| FAQ </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donation" element={<DonationForm />} />
        </Routes>
      </main>
    </>
  );
};

const Auth = () => {
  const { isAuthenticated, user } = useAuth0();

  return isAuthenticated ? (
    <>
      Hello, {user.given_name} <Logout />
    </>
  ) : (
    <Login />
  );
};

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {/* <header className={styles.header}>
        <h1>{process.env.REACT_APP_TITLE}</h1>
        <p>{process.env.REACT_APP_SUBTITLE}</p>
      </header> */}
      {isAuthenticated ? <Distance /> : null}
    </>
  );
};

const DonationForm = () => {
  return (
    <>
      <Donation />
    </>
  );
};

export default App;
