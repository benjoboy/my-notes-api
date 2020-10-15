var express = require("express");
var router = express.Router();
var notebookController = require("../controllers/notebookController.js");

/*
 * GET
 */
router.get("/", notebookController.list); //returns all notebooks

/*
 * POST
 */
router.post("/", notebookController.create);
router.post("/addNote", notebookController.addNote);

/*
 * PUT
 */
router.put("/:id", notebookController.update);
router.put("/:notebookId/:noteId", notebookController.updateNote);

/*
 * DELETE
 */
router.delete("/:id", notebookController.remove);
router.delete("/:notebookId/deleteNote/:noteId", notebookController.removeNote);

module.exports = router;
