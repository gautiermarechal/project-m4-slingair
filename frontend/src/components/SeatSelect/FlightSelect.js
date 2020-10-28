import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

const FlightSelect = ({ handleFlightSelect }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const get = async () => {
      fetch("/flights")
        .then((res) => res.json())
        .then((parsedRes) => setFlights(parsedRes.data));
    };

    get();
  }, []);

  return (
    <Wrapper>
      <label htmlFor="flight">Flight Number :</label>
      <select
        id="flight"
        onChange={handleFlightSelect}
        placeholder="Select a flight"
      >
        <option>Select a flight</option>
        {flights.map((flight) => {
          return <option>{flight.number}</option>;
        })}
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${themeVars.cadmiumRed};
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${themeVars.pagePadding};
  margin-bottom: ${themeVars.pagePadding};
`;

export default FlightSelect;
