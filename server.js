//Dependencies and requirements to setup DB
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const port = (process.env.PORT || 3000);
const bodyParser = require("body-parser");
require("dotenv/config");

const mongoURI = process.env.MONGO_URI;

//Route requirements
const StudentRoutes = require("./routes/api/StudentsRoutes");
const EmployeeRoutes = require("./routes/api/EmployeeRoutes");
const LoginRoutes = require("./routes/api/LoginsRoutes");
const ActiveRoutes = require("./routes/api/ActiveRoutes");


//Utilize parser for requests
app.use(express.static(path.join(__dirname + "/dist")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//API route connections
app.use("/students", StudentRoutes);
app.use("/employees", EmployeeRoutes);
app.use("/logins", LoginRoutes);
app.use("/actives", ActiveRoutes);

mongoose
.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

//Listen for active app on Port 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

