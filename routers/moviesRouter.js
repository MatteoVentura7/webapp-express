const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

// La lista delle rotte con la funzione corrispondente del controller

// Index
router.get("/", movieController.index);

// Show
router.get("/:id", movieController.show);

// Store Review
router.post("/:id/reviews", movieController.storeReview);

// Destroy
router.delete("/:id", movieController.destroy);

module.exports = router;
