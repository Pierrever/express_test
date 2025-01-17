// const { validationResult } = require("express-validator");
// const HttpError = require("../models/http-error");

// const DUMMY_PLACES = [
//   { id: "p1", title: "Empire", desc: "Famous", creator: "u1" },
//   { id: "p2", title: "Shard", desc: "London", creator: "u1" },
// ];

// const getPlaceById = (req, res, next) => {
//   const placeId = req.params.pid;
//   const place = DUMMY_PLACES.find((p) => p.id === placeId);
//   console.log(place);
//   res.json({ place: place });
// };

// const getPlaceUserById = (req, res, next) => {
//   const userId = req.params.uid;
//   const PLACES = DUMMY_PLACES.filter((u) => u.creator === userId);

//   res.json({ place: PLACES });
// };

// const createPlace = (req, res, next) => {
//   const errors = validationResult(req);
//   console.log(errors);
//   console.log('tutaj');
//   if(!errors.isEmpty()) {
//     console.log(errors);
//     throw new HttpError('Invalid input', 422);
//   }
//   console.log(req.body);
//   const { title, description, creator } = req.body;
//   const createdPlace = { title, description, creator };
//   DUMMY_PLACES.push(createPlace);
//   res.status(201).json({ place: createdPlace });
// };

// exports.getPlaceById = getPlaceById;
// exports.getPlaceUserById = getPlaceUserById;
// exports.createPlace = createPlace;


const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  }
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError('Could not find a place for the provided id.', 404);
  }

  res.json({ place }); // => { place } => { place: place }
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter(p => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({ places });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, description, coordinates, address, creator } = req.body;

  // const title = req.body.title;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find(p => p.id === placeId)) {
    throw new HttpError('Could not find a place for that id.', 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({ message: 'Deleted place.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
