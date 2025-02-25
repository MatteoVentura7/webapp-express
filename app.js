const express = require("express");
const app = express();
const cors = require("cors");
const { PORT, FE_URL } = process.env;
// Middlewares
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");
// Router
const moviesRouter = require("./routers/moviesRouter");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// middleware CORS (che permette la comunicazione con il FE)
app.use(
  cors({
    origin: FE_URL,
  })
);
// middleware per i file statici
app.use(express.static("public"));
// middleware per il parsing del req.body
app.use(express.json());

// Routes (le rotte della mia applicazione)
app.use("/movies", moviesRouter);

// Middlewares - Per la gestione degli errori (404, 500)
app.use(notFound);
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
