const cityModel = require("./../../models/city");

exports.create = async (req, res) => {
  await cityModel.create({ ...req.body });
  res.status(201).json({ msg: "City created successfully :))" });
};

exports.getAll = async (req, res) => {
  const cities = await cityModel.find({}, "name href");
  res.json(cities);
};

exports.popular = async (req, res) => {
  const popularCities = await cityModel
    .find(
      {
        repeat: { $gt: 6 },
      },
      "name href"
    )
    .limit(12);

  res.json(popularCities);
};
