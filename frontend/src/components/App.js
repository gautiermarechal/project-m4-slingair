import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import ViewReservation from "./ViewReservation";
import Profile from "./Profile";
import GlobalStyles, { themeVars } from "./GlobalStyles";

const App = () => {
  const [userReservation, setUserReservation] = useState({});
  const [userReservationID, setUserReservationID] = useState("");

  const updateUserReservation = (newData) => {
    setUserReservation({ ...userReservation, ...newData });
  };

  useEffect(() => {
    // TODO: check localStorage for an id
    // if yes, get data from server and add it to state
    let reservationID = "";
    if (localStorage.getItem("reservationID")) {
      reservationID = localStorage.getItem("reservationID");
    }

    const get = async () => {
      fetch(`/reservations/${reservationID}`)
        .then((res) => res.json())
        .then((parsedRes) => setUserReservation(parsedRes.data));
    };

    get();
  }, [setUserReservation]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <SeatSelect />
          </Route>
          <Route exact path="/confirmed">
            <Confirmation userReservation={userReservation} />
          </Route>
          <Route exact path="/view-reservation">
            <ViewReservation userReservation={userReservation} />
          </Route>
          <Route exact path="/profile">
            <Profile userReservation={userReservation} />
          </Route>
          <Route path="">404: Oops!</Route>
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: ${themeVars.background};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;
