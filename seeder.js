const dataMap = require("./data/dataMap");
const mongoose = require("./database");
const Maps = require('./schemas/MapsSchema');
const connectDB = require ("./database.js");



connectDB();

const importData = async () => {
  try {
    
    await Maps.deleteMany();

    const sampleMap = dataMap.map((data) => {
      return { ...data };
    });

    await Maps.insertMany(sampleMap);

    console.log("Data Imported!");
    exit();
  } catch (error) {
    console.error(`${error}`);
    exit(1);
  }
};

const destroyData = async () => {
  try {
    await Maps.deleteMany();

    console.log("Data Destroy!");
    exit();
  } catch (error) {
    console.error(`${error}`);
    exit(1);
  }
};

if (argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
