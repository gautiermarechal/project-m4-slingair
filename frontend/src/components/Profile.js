import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ViewReservation from "./ViewReservation";
import Plane from "./SeatSelect/Plane";

const Profile = ({ userReservation }) => {
  const [flights, setflights] = useState([]);
  useEffect(() => {
    const get = async () => {
      fetch("/flights")
        .then((res) => res.json())
        .then((parsedRes) => {
          console.log(parsedRes.data);
          setflights(Object.keys(parsedRes.data));
        });
    };

    get();
  }, []);

  //Profile
  const [showModalProfile, setShowModalProfile] = useState(false);
  const [newFirstName, setNewFirstName] = useState();
  const [newLastName, setNewLastName] = useState();
  const [newEmail, setNewEmail] = useState();

  //Reservation
  const [showModalReservation, setShowModalReservation] = useState(false);
  const [newFlightNumber, setNewFlightNumber] = useState();
  const [seatSelected, setSeatSelected] = useState();

  const handleSelectedSeat = (seatID) => {
    setSeatSelected(seatID);
  };

  const handleNewFirstName = (e) => {
    setNewFirstName(e.target.value);
  };

  const handleNewLastName = (e) => {
    setNewLastName(e.target.value);
  };

  const handleNewEmail = (e) => {
    setNewEmail(e.target.value);
  };

  const handleNewFlightNumber = (e) => {
    setNewFlightNumber(e.target.value);
  };

  const handleProfileModify = async () => {
    fetch(`/reservations/${userReservation.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        givenName: newFirstName,
        surname: newLastName,
        email: newEmail,
        flight: userReservation.flight,
        seat: userReservation.seat,
      }),
    });
  };

  const handleReservationModify = async () => {
    fetch(`/reservations/${userReservation.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        givenName: userReservation.givenName,
        surname: userReservation.surname,
        email: userReservation.email,
        flight: newFlightNumber,
        seat: seatSelected,
      }),
    });
  };
  return (
    <>
      <Wrapper>
        <UserInfoContainer>
          <FullName>
            {userReservation.givenName} {userReservation.surname}
          </FullName>
          <Email>{userReservation.email}</Email>
          <Button onClick={() => setShowModalProfile(true)}>
            Edit Profile
          </Button>
        </UserInfoContainer>
        <ModifyReservationContainer>
          <ViewReservation userReservation={userReservation} />
          <Button onClick={() => setShowModalReservation(true)}>
            Edit your reservation
          </Button>
          <Button>Cancel your reservation</Button>
        </ModifyReservationContainer>
        {showModalProfile === true && (
          <WrapperModal>
            <ModalModify>
              <X onClick={() => setShowModalProfile(false)}>✖</X>
              <Form onSubmit={handleProfileModify}>
                <h1 style={{ color: "#AA001E" }}>
                  Modify your personal information
                </h1>
                <FormItem>
                  <label htmlFor="input-firstname">First Name:</label>
                  <input id="input-fullname" onChange={handleNewFirstName} />
                </FormItem>
                <FormItem>
                  <label htmlFor="input-lastname">Last Name:</label>
                  <input id="input-fullname" onChange={handleNewLastName} />
                </FormItem>
                <FormItem>
                  <label htmlFor="input-email">Email address:</label>
                  <input id="input-email" onChange={handleNewEmail} />
                </FormItem>
                <Button type="submit">Confirm</Button>
              </Form>
            </ModalModify>
          </WrapperModal>
        )}
        {showModalReservation === true && (
          <WrapperModal>
            <ModalModify>
              <X onClick={() => setShowModalReservation(false)}>✖</X>
              <Form onSubmit={handleReservationModify}>
                <h1 style={{ color: "#AA001E" }}>Modify your reservation</h1>
                <FormItem>
                  <label htmlFor="input-firstname">Flight</label>
                  <select id="input-fullname" onChange={handleNewFlightNumber}>
                    {flights.map((flight) => {
                      return <option>{flight}</option>;
                    })}
                  </select>
                </FormItem>
                <FormItem>
                  <label htmlFor="input-lastname">Seat</label>
                  <Plane
                    flightNumber={newFlightNumber}
                    selectedSeat={seatSelected}
                    handleSeatSelect={handleSelectedSeat}
                  />
                </FormItem>
                <Button type="submit">Confirm</Button>
              </Form>
            </ModalModify>
          </WrapperModal>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  margin-top: 20px;
  @media only screen and (max-width: 800px) {
    & {
      flex-direction: column;
      overflow: scroll;
    }
  }
`;

const UserInfoContainer = styled.div`
  width: 40%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-style: solid;
  border-color: #aa001e;
  border-radius: 7px;
  border-width: 1px;
  padding: 30px;
`;

const FullName = styled.div`
  font-weight: bold;
  font-size: 5vw;
`;

const Email = styled.div`
  font-weight: light;
  font-size: 20px;
  color: rgb(48, 48, 48);
  margin-top: 10px;
`;

const Button = styled.button`
  margin-top: 10px;
  background-color: #aa001e;
  border-color: #aa001e;
  border-style: solid;
  border-radius: 7px;
  border-width: 1px;
  color: #f79d02;
  cursor: pointer;
  transition: 0.3s;
  font-size: 20px;
  &:hover {
    background-color: #f79d02;
    color: #aa001e;
  }
`;

const ModifyReservationContainer = styled.div`
  width: 40%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-style: solid;
  border-color: #aa001e;
  border-radius: 7px;
  border-width: 1px;
  padding: 30px;
`;

const WrapperModal = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  overflow: scroll;
`;

const ModalModify = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 9999;
  top: 50px;
  left: 50;
  width: 400px;
  background-color: #f79d02;
  border-radius: 7px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  input {
    padding: 0;
  }
  width: 80%;
`;

const FormItem = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const X = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  cursor: pointer;
`;

export default Profile;
