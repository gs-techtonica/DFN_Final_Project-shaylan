import * as React from "react";

import { NavLink, Routes, Route } from "react-router-dom";

import Distance from "../Distance";
import Donation from "../Donation";
import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import { Login, Logout, Protected } from "../auth/widgets";

import styles from "./styles.module.scss";

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
        <nav className={styles.nav}>
          <NavLink to="/" end>
            Home
          </NavLink>{" "}
          | <NavLink to="donation">Make a Donation</NavLink> | <Auth />
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
