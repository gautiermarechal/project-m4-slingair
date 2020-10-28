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
  flights.forEach((flight) => {
    if (flight.number === req.params.id) {
      found = true;
      res.status(200).json({ status: 200, data: flight });
    }
  });

  if (!found) {
    res.status(404).json({
      status: 404,
      data: `SA231${req.params.id}`,
      error: "Flight not found",
    });
  }
};

const addReservations = (req, res) => {
  res.status(200).json({ status: 200, data: req.body });
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
    res
      .status(404)
      .json({ status: 404, data: reservation, error: "Reservation not found" });
  }
};

const deleteReservation = (req, res) => {
  let found = false;

  reservations.forEach((reservation) => {
    if (reservation.id === req.params.id) {
      found = true;
      res.status(200).json({ status: 200, data: reservation });
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

  reservations.forEach((reservation) => {
    if (reservation.id === req.params.id) {
      found = true;
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
