console.log("pokrenuto");

const express = require("express");

const app = express();

app.listen(3000, () => {
    console.log("server is listening on a port 3000...");
});