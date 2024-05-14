const uuid = require("uuid/v4");
const HttpError = require("../models/http-error");

DUMMY_USERS = [
  { id: "u1", name: "Peter", email: "vurm@gmail", pw: "hell" },
  { id: "u2", name: "Max", email: "max@gmail", pw: "bolt" },
];

const getUser = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, pw } = req.body;

  const hasUser = DUMMY_USERS.find(p=> p.email === email);

  if (hasUser) {
    throw new HttpError('User already exists', 422);
  }

  const createdUser = { id: uuid(), name: name, email: email, pw: pw };
  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, pw } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.pw !== pw) {
    throw new HttpError("Could not find user", 401);
  }
  res.json({message: 'Logged in!'});
};

exports.getUser = getUser;
exports.signup = signup;
exports.login = login;
