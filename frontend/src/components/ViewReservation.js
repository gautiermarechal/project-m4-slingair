import React from "react";
import styled from "styled-components";

const ViewReservation = ({ userReservation }) => {
  return (
    <>
      <Wrapper>
        <ReservationContainer>
          <ReservationTitle>Your current reservation:</ReservationTitle>
          <Hr />
          <ReservationContent>
            <p>
              <ItemTitle>Reservation #: </ItemTitle> {userReservation.id}
            </p>
            <p>
              <ItemTitle>Flight #:</ItemTitle> {userReservation.flight}
            </p>
            <p>
              <ItemTitle>Seat #:</ItemTitle> {userReservation.seat}
            </p>
            <p>
              <ItemTitle>First Name:</ItemTitle> {userReservation.givenName}
            </p>
            <p>
              <ItemTitle>Last Name:</ItemTitle> {userReservation.surname}
            </p>
            <p>
              <ItemTitle>Email address:</ItemTitle> {userReservation.email}
            </p>
          </ReservationContent>
        </ReservationContainer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ReservationTitle = styled.h1`
  margin-top: 20px;
  margin-bottom: 20px;
  color: #aa001e;
`;

const ReservationContainer = styled.div`
  width: 500px;
  border-style: solid;
  border-width: 2px;
  border-color: #aa001e;
  border-radius: 7px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const Hr = styled.hr`
  border-color: #aa001e;
  width: 90%;
`;

const ReservationContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 30px 20px 30px 20px;
  height: 150px;
`;

const ItemTitle = styled.div`
  display: inline;
  font-weight: bold;
`;

export default ViewReservation;
