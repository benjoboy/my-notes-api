const { isValidObjectId } = require("mongoose");
var notebookModel = require("../models/notebookModel.js");
ObjectId = require("mongodb").ObjectID;

/**
 * notebookController.js
 *
 * @description :: Server-side logic for managing notebooks.
 */
module.exports = {
  create: function (req, res) {
    console.log(req.session.userId);
    var notebook = new notebookModel({
      userId: ObjectId(req.session.userId),
      date: new Date(),
      title: req.body.title,
    });

    notebook.save(function (err, notebook) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating notebook",
          error: err,
        });
      }
      return res.status(201).json(notebook);
    });
  },

  addNote: function (req, res) {
    //TODO addNote
    return null;
  },

  update: function (req, res) {
    //TODO
    return null;
  },

  remove: function (req, res) {
    //TODO
    return null;
  },

  removeNote: function (req, res) {
    //TODO
    return null;
  },
};
