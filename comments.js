// Create web server
var express = require('express');
// Create router
var router = express.Router();
// Create module
var comments = require('../models/comments');

// GET /api/comments
router.get('/', function(req, res, next) {
  comments.find(function(err, comments) {
    if(err) {
      return res.status(500).json({
        message: err.message
      });
    }
    res.json(comments);
  });
});

// POST /api/comments
router.post('/', function(req, res, next) {
  var comment = new comments({
    name: req.body.name,
    comment: req.body.comment,
    date: req.body.date
  });
  comment.save(function(err, comment) {
    if(err) {
      return res.status(500).json({
        message: err.message
      });
    }
    res.json({
      message: 'Success',
      comment: comment
    });
  });
});

// PUT /api/comments/:id
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  comments.findById(id, function(err, comment) {
    if(err) {
      return res.status(500).json({
        message: err.message
      });
    }
    if(!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }
    comment.name = req.body.name;
    comment.comment = req.body.comment;
    comment.date = req.body.date;
    comment.save(function(err, comment) {
      if(err) {
        return res.status(500).json({
          message: err.message
        });
      }
      res.json({
        message: 'Comment updated',
        comment: comment
      });
    });
  });
});

// DELETE /api/comments/:id
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  comments.findByIdAndRemove(id, function(err, comment) {
    if(err) {
      return res.status(500).json({
        message: err.message
      });
    }
    res.json({
      message: 'Comment deleted',
      comment: comment
    });
  });
});

// Export router
module.exports = router;