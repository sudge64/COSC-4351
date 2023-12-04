// Database access code
import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "Uno",
});

const PORT = process.env.PORT || 3306;
server.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});

db.connect(function(err){
  if(err) throw err;
  console.log("Connected!)");
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/game", (req, res) => {
  const q = "SELECT * FROM game";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/game", (req, res) => {
  const q = "INSERT INTO game(`owner`, `date_played`, `gid`) VALUES (?)";

  const values = [
    req.body.owner,
    req.body.game_played,
    req.body.gid,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/game/:gid", (req, res) => {
  const gameId = req.params.gid;
  const q = " DELETE FROM game WHERE gid = ? ";

  db.query(q, [gameId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/game/:gid", (req, res) => {
  const gameId = req.params.gid;
  const q = "UPDATE game SET `owner`= ?, `date_played`= ? WHERE gid = ?";

  const values = [
    req.body.owner,
    req.body.game_played,
    req.body.gid,
  ];

  db.query(q, [...values,gameId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});