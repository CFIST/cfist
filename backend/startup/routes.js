const bodyParser = require("body-parser");
/* List routes we will use for CFIST; these are only examples
const login = require("../routes/login");
const users = require("../routes/users");
const relations = require("../routes/relations");
*/
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(bodyParser.json());
  /* example of how to use login route
    app.use("/api/login", login);
  */
  app.use(error); // keep this last
};
