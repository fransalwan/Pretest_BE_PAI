// import model
const FarmModel = require("../models/farms");

const getAllFarms = async (req, res, next) => {
  try {
    const [data] = await FarmModel.getAllFarms();
    res.json({
      message: "Get all farms success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error,
    });
  }
};

const createNewFarm = async (req, res) => {
  const { body } = req;

  if (!body.name || !body.location) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
  }

  try {
    await FarmModel.createNewFarm(body);
    res.status(201).json({
      message: "Create new farm success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error,
    });
  }
};

const updateFarm = async (req, res) => {
  const { idFarm } = req.params;
  const { body } = req;
  try {
    await FarmModel.updateFarm(body, idFarm);
    res.json({
      message: "Update farm success",
      data: {
        id: idFarm,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error,
    });
  }
};

const deleteFarm = async (req, res) => {
  const { idFarm } = req.params;
  try {
    await FarmModel.deleteFarm(idFarm);
    res.json({
      message: "Delete farm success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllFarms,
  createNewFarm,
  updateFarm,
  deleteFarm,
};
