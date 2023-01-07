const dbPool = require("../config/database");

const getAllFarms = () => {
  const SQLQuery = "SELECT * FROM farms";

  return dbPool.execute(SQLQuery);
};

const createNewFarm = (body) => {
  const SQLQuery = `  INSERT INTO farms (name, location) 
                      VALUES ('${body.name}', '${body.location}')`;

  return dbPool.execute(SQLQuery);
};

const updateFarm = (body, idFarm) => {
  const SQLQuery = `  UPDATE farms 
                      SET name='${body.name}', location='${body.location}' 
                      WHERE farm_id=${idFarm}`;
  return dbPool.execute(SQLQuery);
};

const deleteFarm = (idFarm) => {
  const SQLQuery = `DELETE FROM farms WHERE farm_id=${idFarm}`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllFarms,
  createNewFarm,
  updateFarm,
  deleteFarm,
};
