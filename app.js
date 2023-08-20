const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const mysql = require("mysql");

const addFarmRoutes = require("./routes/addFarms");
const customerRoutes=require("./routes/customer");
const addFarmOwnerRoutes = require("./routes/addFarmOwner");
const addFarmMedicinRoutes = require("./routes/addFarmMedicin");
const addFarmWaterReportRoutes=require("./routes/addFarmWaterReport");
const addPictureRoutes=require("./routes/addPicture");
const usersData=require("./routes/usersData");
const login=require("./routes/login");
const app = express();

// mongoose
//   .connect('mongodb://localhost:27017/shrimp',
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch((err) => {
//     console.log("Connection failed!", err);
//   });
  // mongodb+srv://sukhvinder_2324:Mongodb@123@cluster0.xef28.mongodb.net/shrimp
  // mongodb+srv://sukhvinder_2324:<password>@cluster0.xef28.mongodb.net/test
  const db='mongodb+srv://sukhvinder_2324:Manshu@cluster0.xef28.mongodb.net/shrimp?retryWrites=true&w=majority'
mongoose
  .connect(db,
  {useNewUrlParser: true,
     useUnifiedTopology: true}
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!",err);
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    'Access-Control-Allow-Origin', '*'
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE,PUT, OPTIONS"
  );
  next();
});
app.use(express.static("frontend"));
app.use("/", addFarmRoutes);
app.use("/", addFarmOwnerRoutes);
app.use("/",addFarmMedicinRoutes);
app.use("/",addFarmWaterReportRoutes);
app.use('/',require('./routes/cultivation'));
app.use('/',require('./routes/imageUploader'));
app.use('/',addPictureRoutes);
app.use('/',customerRoutes);
app.use('/',usersData);
app.use('/',login);


module.exports = app;
 // this is the main entry file, this need not be exported
app.listen(3000,(err)=>{
  if(err){
    console.log('error occured while running server');
  }else{
    console.log('Server is running on port no 3000')
  }
})


