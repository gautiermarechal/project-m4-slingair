"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//  Use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const getFlights = (req, res) => {
  res.status(200).json({ status: 200, data: flights });
};

const getFlight = (req, res) => {
  let found = false;

  let flightNumbers = Object.keys(flights);
  console.log(flightNumbers);

  flightNumbers.forEach((flightNumber) => {
    if (flightNumber === req.params.id) {
      found = true;
      res.status(200).json({ sttaus: 200, data: flights[flightNumber] });
    }
  });

  if (!found) {
    res.status(404).json({
      status: 404,
      data: `Flight number: ${req.params.id}`,
      error: "Flight not found",
    });
  }
};

const addReservations = (req, res) => {
  console.log(req.body);
  let newReservation = { id: uuidv4(), ...req.body };
  let flightTarget = newReservation.flight;
  let seatTarget = newReservation.seat;

  let flightNumbers = Object.keys(flights);

  flightNumbers.forEach((flightNumber) => {
    if (flightNumber === flightTarget) {
      flights[flightNumber].forEach((seat) => {
        if (seat.id === seatTarget) {
          if (seat.isAvailable) {
            seat.isAvailable = false;
            reservations.push(newReservation);
          } else {
            res
              .status(403)
              .json({ status: 403, message: "Seat already taken" });
          }
        }
      });
    }
  });
  res.status(201).json({
    status: 201,
    message: "Success! New reservation created!",
    data: newReservation,
  });
};

const getReservations = (req, res) => {
  res.status(200).json({ status: 200, data: reservations });
};

const getSingleReservation = (req, res) => {
  let found = false;
  reservations.forEach((reservation) => {
    if (reservation.id === req.params.id) {
      found = true;
      res.status(200).json({ status: 200, data: reservation });
    }
  });

  if (!found) {
    res.status(404).json({
      status: 404,
      data: `Reservation id: ${req.params.id}`,
      error: "Reservation not found",
    });
  }
};

const deleteReservation = (req, res) => {
  let found = false;
  let reservationToDelete = {};

  reservations.forEach((reservation, index) => {
    if (reservation.id === req.params.id) {
      found = true;
      reservationToDelete = reservation;
      reservations.splice(index, 1);
    }
  });

  let flightTarget = reservationToDelete.flight;
  let seatTarget = reservationToDelete.seat;

  let flightNumbers = Object.keys(flights);

  flightNumbers.forEach((flightNumber) => {
    if (flightNumber === flightTarget) {
      flights[flightNumber].forEach((seat) => {
        if (seat.id === seatTarget) {
          seat.isAvailable = true;
          res.status(200).json({ status: 200, data: "Reservation deleted!" });
        }
      });
    }
  });

  if (!found) {
    res
      .status(404)
      .json({ status: 404, data: reservation, error: "Reservation not found" });
  }
};

const updateReservation = (req, res) => {
  let found = false;
  let update = { id: req.params.id, ...req.body };

  reservations.forEach((reservation, index) => {
    if (reservation.id === req.params.id) {
      found = true;
      reservations.splice(index, 1);
      reservations.push(update);
      res.status(200).json({ status: 200, data: reservation });
    }
  });

  if (!found) {
    res
      .status(404)
      .json({ status: 404, data: reservation, error: "Reservation not found" });
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
