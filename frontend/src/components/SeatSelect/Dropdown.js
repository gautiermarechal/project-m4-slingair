import React from "react";
import styled from "styled-components";

const DropDownComponent = ({
  showFlightNumber,
  flightNumber,
  flights,
  handleFlightSelect,
  handleShowFlightNumber,
}) => {
  return (
    <DropDown>
      <DropDownButton
        type="button"
        onClick={() =>
          showFlightNumber
            ? handleShowFlightNumber(false)
            : handleShowFlightNumber(true)
        }
      >
        {flightNumber ? flightNumber : <h2>Select a flight</h2>}
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
  );
};

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

export default DropDownComponent;
