const { response } = require("express");
const User = require("../models/user");

const getUsers = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0;

  const users = await User.find({ _id: { $ne: req.uid } })
    .sort("-online")
    .skip(desde)
    .limit(20);

  res.json({
    ok: true,
    msg: "getUsuarios",
    users: users,
    from: desde,
  });
};

module.exports = { getUsers };
