var express = require("express");
var router = express.Router();
var notebookController = require("../controllers/notebookController.js");

/*
 * GET
 */

/*
 * POST
 */
router.post("/", notebookController.create);
router.post("/:id", notebookController.addNote);

/*
 * PUT
 */
router.put("/:id", notebookController.update);

/*
 * DELETE
 */
router.delete("/:id", notebookController.remove);
router.delete(
  "/:notebookId/deleteNote/:commentId",
  notebookController.removeNote
);

module.exports = router;
