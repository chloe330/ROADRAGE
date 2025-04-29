const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "coffeeweb",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.get("/comments", (req, res) => {
  db.query(
    "SELECT id, customer_name, review_text, likes FROM comments ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

app.post("/comments", (req, res) => {
  const { customer_name, review_text } = req.body;

  if (!customer_name || !review_text) {
    return res
      .status(400)
      .json({ error: "Name and comment text are required." });
  }

  db.query(
    "INSERT INTO comments (customer_name, review_text) VALUES (?, ?)",
    [customer_name, review_text],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        id: result.insertId,
        customer_name,
        review_text,
        likes: 0,
      });
    }
  );
});

app.post("/comments/:id/like", (req, res) => {
  const commentId = req.params.id;

  db.query(
    "UPDATE comments SET likes = likes + 1 WHERE id = ?",
    [commentId],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query(
        "SELECT likes FROM comments WHERE id = ?",
        [commentId],
        (err, results) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ likes: results[0].likes });
        }
      );
    }
  );
});

app.post("/comments/:id/replies", (req, res) => {
  const commentId = req.params.id;
  const { customer_name, reply_text } = req.body;

  if (!customer_name || !reply_text) {
    return res.status(400).json({ error: "Name and reply text are required." });
  }

  db.query(
    "INSERT INTO replies (comment_id, customer_name, reply_text) VALUES (?, ?, ?)",
    [commentId, customer_name, reply_text],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        id: result.insertId,
        comment_id: commentId,
        customer_name,
        reply_text,
        created_at: new Date(),
      });
    }
  );
});

app.get("/comments/:id/replies", (req, res) => {
  const commentId = req.params.id;

  db.query(
    "SELECT * FROM replies WHERE comment_id = ? ORDER BY created_at ASC",
    [commentId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
