const { isValidObjectId } = require("mongoose");
var notebookModel = require("../models/notebookModel.js");
ObjectId = require("mongodb").ObjectID;

/**
 * notebookController.js
 *
 * @description :: Server-side logic for managing notebooks.
 */
module.exports = {
  list: function (req, res) {
    notebookModel.find(
      {
        userId: ObjectId(req.session.userId),
      },
      function (err, list) {
        if (err) {
          return res.status(500).json({
            message: "Error getting notebooks",
            error: err,
          });
        }
        return res.status(200).json(list);
      }
    );
  },

  create: function (req, res) {
    if (req.session.userId) {
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
        return res.status(201).json({
          notebook: notebook,
          status: "created",
        });
      });
    } else
      res.status(500).json({
        message: "user not logged in",
      });
  },

  addNote: function (req, res) {
    notebookModel.updateOne(
      {
        _id: ObjectId(req.body.id),
        userId: ObjectId(req.session.userId), //authentication
      },
      {
        $push: {
          notes: {
            title: req.body.title,
            content: req.body.content,
            editDate: new Date(),
          },
        },
      },
      function (err, note) {
        if (err) {
          return res.status(500).json({
            message: "Error adding a note",
            error: err,
          });
        } else if (note.nModified === 0) {
          return res.status(500).json({
            message: "Error adding a note, user probably not loged in",
          });
        }
        return res.status(201).json({
          status: "created",
          note: note,
        });
      }
    );
  },

  update: function (req, res) {
    console.log(req.params.id);
    if (!req.body.title) {
      return res.status(500).json({
        message: "No title",
      });
    }
    notebookModel.updateOne(
      {
        _id: ObjectId(req.params.id),
        userId: ObjectId(req.session.userId), //auth
      },
      {
        $set: {
          title: req.body.title,
        },
      },
      function (err, notebook) {
        if (err) {
          return res.status(500).json({
            message: "Error updating notebook",
            error: err,
          });
        } else if (notebook.nModified === 0) {
          console.log(notebook);
          return res.status(500).json({
            message: "Error updating notebook, user probably not loged in",
          });
        }
        return res.status(204).json({});
      }
    );
  },
  updateNote: function (req, res) {
    notebookModel.updateOne(
      {
        userId: ObjectId(req.session.userId),
        _id: ObjectId(req.params.notebookId),
        "notes._id": ObjectId(req.params.noteId),
      },
      {
        $set: {
          "notes.$.title": req.body.title,
          "notes.$.content": req.body.content,
          "notes.$.editDate": new Date(),
        },
      },
      function (err, note) {
        if (err) {
          return res.status(500).json({
            message: "Error updating a note",
            error: err,
          });
        }
        return res.status(200).json({
          status: "updated",
          message: "note was updated",
        });
      }
    );
  },

  remove: function (req, res) {
    notebookModel.deleteOne(
      { _id: ObjectId(req.params.id), userId: ObjectId(req.session.userId) },
      function (err, notebook) {
        if (err) {
          return res.status(500).json({
            message: "Error deleting notebook",
            error: err,
          });
        }
        return res.status(204).json();
      }
    );
    return null;
  },

  removeNote: function (req, res) {
    notebookModel.updateOne(
      {
        userId: ObjectId(req.session.userId),
        _id: ObjectId(req.params.notebookId),
      },
      {
        $pull: { notes: { _id: ObjectId(req.params.noteId) } },
      },
      function (err, note) {
        if (err) {
          return res.status(500).json({
            message: "Error deleting a note",
            error: err,
          });
        }
        return res.status(204).json();
      }
    );
  },
};
