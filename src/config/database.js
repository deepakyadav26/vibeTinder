const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vibedev:Sb0AuyRj12eALogO@tindercluster.wr66erz.mongodb.net/vibedatabase"
  );
};

module.exports = connectDB;