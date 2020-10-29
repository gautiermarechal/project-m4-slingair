import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

const FlightSelect = ({ handleFlightSelect }) => {
  const [flights, setFlights] = useState([]);
  const [flightNumbers, setFlightNumbers] = useState([]);
  const [showFlightNumber, setShowFlightNumber] = useState(false);

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
      <DropDown>
        <DropDownButton
          onClick={() =>
            showFlightNumber
              ? setShowFlightNumber(false)
              : setShowFlightNumber(true)
          }
        >
          <h2>Select a flight</h2>
        </DropDownButton>
        <DropDownContent show={showFlightNumber}>
          {flights.map((flight) => {
            return (
              <DropDownItem
                type="button"
                onClick={handleFlightSelect}
                key={flight.number}
                value={flight.number}
              />
            );
          })}
        </DropDownContent>
      </DropDown>
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

const DropDownButton = styled.button`
  background-color: #f79d02;
  border-style: solid;
  border-color: #f79d02;
  border-radius: 7px;
  border-width: 1px;
  padding: 5px;
  cursor: pointer;
  margin-left: 5px;
  transition: 0.3s;
  h2 {
    font-size: 30px;
  }
  &:hover {
    background-color: #d80026;

    border-color: #f79d02;
  }
`;

const DropDownContent = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  width: 100%;
  background-color: #f79d02;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 7px;
  text-align: center;
`;

const DropDownItem = styled.input`
  transition: 0.3s;
  cursor: pointer;
  background-color: #f79d02;
  height: 100%;
  padding: 15px;
  &:hover {
    background-color: #aa001e;
    color: white;
  }
`;

export default FlightSelect;
