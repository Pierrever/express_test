const DUMMY_PLACES = [
  { id: "p1", title: "Empire", desc: "Famous", creator: "u1" },
  { id: "p2", title: "Shard", desc: "London", creator: "u1" },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  console.log(place);
  res.json({ place: place });
};

const getPlaceUserById = (req, res, next) => {
  const userId = req.params.uid;
  const PLACES = DUMMY_PLACES.filter((u) => u.creator === userId);

  res.json({ place: PLACES });
};

const createPlace = (req, res, next) => {
  console.log(req.body);
  const { title, description, creator } = req.body;
  const createdPlace = { title, description, creator };
  DUMMY_PLACES.push(createPlace);
  res.status(201).json({ place: createdPlace });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceUserById = getPlaceUserById;
exports.createPlace = createPlace;
