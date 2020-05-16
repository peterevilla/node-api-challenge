const express = require("express");
const actionDb = require('../data/helpers/actionModel')
const router = express.Router();

router.get('/', (req, res) => {

    actionDb.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      res.status(500).json({ message: "The information can not be retreived" });
    });
})

router.get('/:id', (req, res) => {

    actionDb.get(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      res.status(500).json({ message: "The information can not be retreived" });
    });
})


router.delete('/:id', (req, res) => {
    actionDb.remove(req.params.id)
    .then((action) => {
        if (action > 0) {
          res.status(201).json({ message: "the action  was deleted" });
        } else {
          res.status(404).json({ message: "not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: " there was an error" });
      });
  })



  router.put('/:id', (req, res) => {
    actionDb.update(req.params.id, req.body)
    .then((project) => {

          res.status(201).json(project);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: "There was an error trying updating" });
      });
})











module.exports = router;