import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

const FlightSelect = ({ handleFlightSelect }) => {
  const [flights, setFlights] = useState([]);
  const [showFlightNumber, setShowFlightNumber] = useState(false);

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
      <DropDown>
        <DropDownButton
          onClick={() =>
            showFlightNumber
              ? setShowFlightNumber(true)
              : setShowFlightNumber(true)
          }
        >
          Select a flight
        </DropDownButton>
        <DropDownContent show={showFlightNumber}>
          {flights.map((flight) => {
            return <div>{flight.number}</div>;
          })}
        </DropDownContent>
      </DropDown>
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

const DropDown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropDownButton = styled.button``;

const DropDownContent = styled.div`
  display: ${(props) => (props.showFlightNumber ? "block" : "none")}
  position: absolute;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export default FlightSelect;
