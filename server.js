//Dependencies and requirements to setup DB
const { mongoConnect } = require("./config/dbconfig");
const port = (process.env.PORT || 3000);
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
app.use(cors());

//Route requirements
const StudentRoutes = require("./routes/api/StudentsRoutes");
const EmployeeRoutes = require("./routes/api/EmployeeRoutes");
const LoginRoutes = require("./routes/api/LoginsRoutes");
const ActiveRoutes = require("./routes/api/ActiveRoutes");


//Initiate app connection to MongoDB
async function startServer() {
  await mongoConnect();
  
  
  //Utilize parser for requests
  app.use(express.static(path.join(__dirname + "/dist")));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  //API route connections
  app.use("/students", StudentRoutes);
  app.use("/employees", EmployeeRoutes);
  app.use("/logins", LoginRoutes);
  app.use("/actives", ActiveRoutes);

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/dist/index.html"));
  });

  //Listen for active app on Port 3000
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

//Start the app
startServer();
