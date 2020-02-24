require("express-async-errors");
const express = require("express");
const app = express();
const http = require("http").createServer(app);

require("./startup/db")();
require("./startup/routes")(app);

const PORT = 5000;
http.listen(5000, () => console.log(`CFist listening on port ${PORT}`));

