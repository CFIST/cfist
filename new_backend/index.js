const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const db = require("./mysql-conn");

//  TO RUN DO THE FOLLOWING

// Create a file named "mysql-conn.js"
// Copy and paste the following in the file
/*
var mysql = require("mysql");
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root', //this should be your username for MySQL
    password: '', //your password for MySQL
    database: 'cs160'
  });
  // Connect
  db.connect(err => {
    if (err) {
      console.log(err);
    }
  });

  module.exports = db;

*/


//  THEN RUN THE FOLLOWING COMMANDS
// npm install
// npx nodemon

  app.use(cors());


  app.get("/login", (req, res) => {
    const { email } = req.query;
    db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results
        });
      }
    });
  });
  
  app.get("/getcoachid", (req, res) => {
    //const { email } = req.query;
    db.query(`SELECT coach_id FROM coach ORDER BY coach_id DESC LIMIT 1`, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results
        });
      }
    });
  });

  app.get("/getseasonid", (req, res) => {
    //const { email } = req.query;
    db.query(`SELECT season_id FROM season_records ORDER BY season_id DESC LIMIT 1`, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results
        });
      }
    });
  });

  app.get("/getplayerid", (req, res) => {
    db.query(`SELECT player_id  FROM players ORDER BY player_id DESC LIMIT 1`, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results
        });
      }
    });
  });

  app.get("/getSchools", (req, res) => {
    db.query(`SELECT * FROM school`, (err, results) => {
      if (err) {
        return res.send(err);
      } 
      else {
        return res.json({
          data: results
        });
      }
    });
  });

  app.get("/getSchoolData", (req, res) => {
    const {school_name, zip_code}  = req.query;
    db.query(`Select * FROM football_program JOIN school ON (school_zip_code = zip_code AND name = school_name) JOIN
		    college_team ON(college_team.team_name = football_program.team_name AND football_program.team_conference = college_team.conference)
        JOIN coached_by ON (coached_by.team_name = college_team.team_name AND coached_by.conference = college_team.conference)
        JOIN coach ON (coach.coach_id = coached_by.coach_id)
        WHERE school_name = '${school_name}' AND zip_code = ${zip_code};`, (err, results) => {
      if (err) {
        return res.send(err);
      } 
      else {
        return res.json({
          data: results
        });
      }
    });
  });

  app.get("/searchResults", (req, res) => {
    const { searchInput } = req.query;
    db.query(
      `SELECT * FROM school WHERE name LIKE '%${searchInput}%'`,
      (err, results) => {
        if (err) {
          return res.send(err);
        } else {
          return res.json({
            data: results
          });
        }
      }
    );
  });
  
  app.get("/getPlayerData", (req, res) => {
    const {team_name, conference}  = req.query;
    db.query(`  Select * FROM belongs_to JOIN
		players ON(belongs_to.player_id = players.player_id)
        WHERE belongs_to.team_name = '${team_name}'  AND belongs_to.conference = '${conference}';`, (err, results) => {
      if (err) {
        return res.send(err);
      } 
      else {
        return res.json({
          data: results
        });
      }
    });
  });



  app.get("/addUser", (req, res) => {
    console.log("added a user");
    const {username, password, email, administrator}  = req.query;
    const INSERT_USER_QUERY = `INSERT INTO users (email,username,password,administrator) VALUES( '${email}','${username}','${password}','${administrator}')`;
    db.query(INSERT_USER_QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results
        });
      }
    });
  });

  app.get("/addSchool", (req, res) => {
    const {tuition, state, zip_code, name, city, school_logo}  = req.query;
    const INSERT_USER_QUERY = `INSERT INTO school (tuition, state, zip_code, name, city, school_logo) VALUES( '${tuition}','${state}','${zip_code}','${name}','${city}','${school_logo}')`;
    db.query(INSERT_USER_QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results
        });
      }
    });
  });

  app.get("/deleteSchool", (req, res) => {
    const {zip_code}  = req.query;
    DELETE_USER_QUERY = 'DELETE school, college_team, football_program, coached_by, belongs_to, coach, players, has_record, season_records FROM school JOIN football_program ON school.name = football_program.school_name JOIN college_team on football_program.team_name = college_team.team_name JOIN coached_by on coached_by.team_name = football_program.team_name JOIN belongs_to on belongs_to.team_name = football_program.team_name JOIN coach on coached_by.coach_id = coach.coach_id JOIN players on players.player_id = belongs_to.player_id JOIN has_record on has_record.team_name = football_program.team_name JOIN season_records on season_records.season_id = has_record.season_id WHERE school.zip_code = ';
    DELETE_USER_QUERY = DELETE_USER_QUERY.concat(zip_code)
    db.query(DELETE_USER_QUERY, (err, results) => {
      if (err) {
        console.log(err);
        return res.send(err);
      } else {
        console.log(res.json);
        return res.json({
          data: results
        });
      }
    });
  });

  app.get("/addFootballProgram", (req, res) => {
    const {school_zip_code, school_name, team_name, team_conference}  = req.query;
    const INSERT_USER_QUERY = `INSERT INTO football_program (school_zip_code, school_name, team_name, team_conference) VALUES( '${school_zip_code}','${school_name}','${team_name}','${team_conference}')`;
    db.query(INSERT_USER_QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results
        });
      }
    });
  });

  app.get("/addCollegeTeam", (req, res) => {
    const {team_name, heisman_trophies, conference, mascot,national_championships,team_logo}  = req.query;
    const INSERT_USER_QUERY = `INSERT INTO college_team (team_name, heisman_trophies, conference, mascot, national_championships, team_logo ) VALUES( '${team_name}','${heisman_trophies}','${conference}','${mascot}','${national_championships}','${team_logo}')`;
    db.query(INSERT_USER_QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results
        });
      }
    });
  });

  app.get("/addCoachedBy", (req, res) => {
    const {coach_id, team_name, conference}  = req.query;
    const INSERT_USER_QUERY = `INSERT INTO coached_by (coach_id, team_name, conference) VALUES( '${coach_id}','${team_name}','${conference}')`;
    db.query(INSERT_USER_QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results
        });
      }
    });
  });

  app.get("/addCoach", (req, res) => {
    const {coach_id, experience, coach_name}  = req.query;
    const INSERT_USER_QUERY = `INSERT INTO coach ( coach_id, experience, coach_name) VALUES( '${coach_id}','${experience}','${coach_name}')`;
    db.query(INSERT_USER_QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results
        });
      }
    });
  });

  app.get("/addBelongsTo", (req, res) => {
    const {player_id, team_name, conference}  = req.query;
    const INSERT_USER_QUERY = `INSERT INTO belongs_to (player_id, team_name, conference) VALUES( '${player_id}','${team_name}','${conference}')`;
    db.query(INSERT_USER_QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results
        });
      }
    });
  });

    app.get("/addPlayers", (req, res) => {
      const {player_id, number, name,nfl_team,position, recruting_rank,player_image}  = req.query;
      const INSERT_USER_QUERY = `INSERT INTO players (player_id, number, name,nfl_team,position,recruting_rank,player_image) VALUES( '${player_id}','${number}','${name}','${nfl_team}','${position}','${recruting_rank}','${player_image}')`;
      db.query(INSERT_USER_QUERY, (err, results) => {
        if (err) {
          return res.send(err);
        } else {
          return res.json({
            data: results
          });
        }
      });
    });

    app.get("/deletePlayer", (req, res) => {
      const {player_id}  = req.query;
      var DELETE_USER_QUERY = 'DELETE players, belongs_to FROM players JOIN belongs_to ON players.player_id = belongs_to.player_id WHERE players.player_id = ';
      DELETE_USER_QUERY = DELETE_USER_QUERY.concat(player_id);
      db.query(DELETE_USER_QUERY, (err, results) => {
        if (err) {
          return res.send(err);
        } else {
          return res.json({
            data: results
          });
        }
      });
    });


    app.get("/addHasRecord", (req, res) => {
      const {season_id, team_name, record_year,conference}  = req.query;
      const INSERT_USER_QUERY = `INSERT INTO has_record (season_id, team_name, record_year,conference) VALUES( '${season_id}','${team_name}','${record_year}','${conference}')`;
      db.query(INSERT_USER_QUERY, (err, results) => {
        if (err) {
          return res.send(err);
        } else {
          return res.json({
            data: results
          });
        }
      });
    });
  
    app.get("/addSeasonRecords", (req, res) => {
      const {final_CFP_rank, total_wins, total_losses,conference_losses, conference_wins,season_id,champions}  = req.query;
      const INSERT_USER_QUERY = `INSERT INTO season_records (final_CFP_rank, total_wins, total_losses,conference_losses, conference_wins,season_id,champions) VALUES( '${final_CFP_rank}','${total_wins}','${total_losses}','${conference_losses}','${conference_wins}','${season_id}','${champions}')`;
      db.query(INSERT_USER_QUERY, (err, results) => {
        if (err) {
          return res.send(err);
        } else {
          return res.json({
            data: results
          });
        }
      });
    });

    app.get("/getSeasonData", (req, res) => {
      const {team_name, conference}  = req.query;
      db.query(`SELECT * FROM has_record JOIN season_records ON(has_record.season_id = season_records.season_id)
          WHERE team_name = '${team_name}' AND conference = '${conference}';`, (err, results) => {
        if (err) {
          return res.send(err);
        } 
        else {
          return res.json({
            data: results
          });
        }
      });
    });

  app.get("/", (req, res) => {
    res.send("THIS IS THE HOME");
  });

  app.listen("4000", () => {
    console.log("Server started on port 4000");
  });

