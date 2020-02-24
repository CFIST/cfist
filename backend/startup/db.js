const db = require("../modules/database");
// check previous db.js for example

module.exports = function() {
  db.authenticate()
    .then(() => console.log("database connected"))
    .catch(err => console.log("Error:" + err));

  db.sync({ logging: false })
    .then(() => console.log("All models synced to tables"))
    .catch(err => console.log("Issue syncing models:" + err));
};
