import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";
import DropDown from "./Dropdown";

const FlightSelect = ({ handleFlightSelect, flightNumber }) => {
  const [flights, setFlights] = useState([]);
  const [flightNumbers, setFlightNumbers] = useState([]);
  const [showFlightNumber, setShowFlightNumber] = useState(false);
  const [chosenFlightNumber, setChosenFlightNumber] = useState("");

  const handleShowFlightNumber = (bool) => {
    setShowFlightNumber(bool);
  };

  useEffect(() => {
    const get = async () => {
      fetch("/flights")
        .then((res) => res.json())
        .then((parsedRes) => {
          let tempArray = [];
          setFlightNumbers(Object.keys(parsedRes.data));
          Object.keys(parsedRes.data).forEach((flightNumber) => {
            tempArray.push({
              number: flightNumber,
              seats: parsedRes.data[flightNumber],
            });
          });
          setFlights(tempArray);
        });
    };

    get();
  }, []);

  return (
    <Wrapper>
      <label htmlFor="flight">Flight Number :</label>
      <DropDown
        showFlightNumber={showFlightNumber}
        flightNumber={flightNumber}
        flights={flights}
        handleFlightSelect={handleFlightSelect}
        handleShowFlightNumber={handleShowFlightNumber}
      />
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
