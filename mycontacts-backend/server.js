console.log("Express project Started!");

const dotenv = require("dotenv").config();

const express = require("express");

const app = express();

const port = process.env.PORT || 5000;

app.listen( port, () => {
    console.log(`Server is running on ${port}`);
});


app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));


