// Recupero la connessione al database
const connection = require("../data/db");

// Index
const index = (req, res) => {
  const sql = "SELECT * FROM movies";

  // lancio la query
  connection.execute(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${sql}`,
      });
    }

    res.json(results);
  });
};

// Show
const show = (req, res) => {
  // Recuperiamo l'id dalla rotta
  const { id } = req.params;

  const movieSql = `
    SELECT * 
    FROM movies
    WHERE id = ?`;

  // lancio la query preparata per leggere il film con id ?
  connection.execute(movieSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${movieSql}`,
      });
    }

    // Recupero il film dall'array dei risultati
    const movie = results[0];

    if (!movie) {
      return res.status(404).json({
        error: "Not found",
        message: "Movie not found",
      });
    }

    // query per recuperare le recensioni del film
    const reviewsSql = `
    SELECT * 
    FROM reviews
    WHERE movie_id = ?`;

    connection.execute(reviewsSql, [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Query Error",
          message: `Database query failed: ${reviewsSql}`,
        });
      }

      // aggiungo la chiave reviews
      movie.reviews = results;
      res.json(movie);
    });
  });
};

// Destroy
const destroy = (req, res) => {};

module.exports = { index, show, destroy };
