const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const corsMiddleware = require("./middleware/corsMiddleware");
const errorHandler = require("./middleware/errorHandler");

// Import Routes
const addFarmRoutes = require("./routes/addFarms");
const addFarmOwnerRoutes = require("./routes/addFarmOwner");
const addFarmMedicinRoutes = require("./routes/addFarmMedicin");
const addFarmWaterReportRoutes = require("./routes/addFarmWaterReport");
const addPictureRoutes = require("./routes/addPicture");
const login = require("./routes/login");
const customerRoutes = require("./routes/customer");
const usersData = require("./routes/usersData");
const conversationRoutes = require("./routes/conversations");
const storiesRoutes = require("./routes/stories");
const cultivationRoutes = require("./routes/cultivation");
const imageUploaderRoutes = require("./routes/imageUploader");

const app = express();

// Initialize Database Connection
connectDB();

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(corsMiddleware);
app.use(express.static("frontend"));

// Route Registration
const routes = [
  addFarmRoutes,
  addFarmOwnerRoutes,
  addFarmMedicinRoutes,
  addFarmWaterReportRoutes,
  addPictureRoutes,
  login,
  usersData,
  customerRoutes,
  conversationRoutes,
  storiesRoutes,
  cultivationRoutes,
  imageUploaderRoutes
];

routes.forEach(route => app.use("/", route));

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;


