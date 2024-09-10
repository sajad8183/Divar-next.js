const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const app = require("./app");

// Load env
const productionMode = process.env.NODE_ENV === "production";
if (!productionMode) {
  dotenv.config();
}

//* Database connection
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
}

// Start app
async function startServer() {
  const port = +process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(
      `Server running in ${
        productionMode ? "production" : "development"
      } mode on port ${port}`
    );
  });
}

async function run() {
  await connectToDB();
  await startServer();
}

run();
