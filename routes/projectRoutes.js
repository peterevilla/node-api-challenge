const express = require("express");
const projectDb = require("../data/helpers/projectModel");
const actionDb = require('../data/helpers/actionModel')
const router = express.Router();


//GET LIST OF PROJECTS
router.get("/", (req, res) => {
  projectDb
    .get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      res.status(500).json({ message: "The information can not be retreived" });
    });
});
//GET PROJECT BY ID
router.get("/:id", (req, res) => {
  projectDb
    .get(req.params.id)
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      res.status(500).json({ message: "The information can not be retreived" });
    });
});
// GET ACTIONS FROM A PROJECT
router.get('/:id/actions', (req, res) => {
    projectDb.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch((error) => {
        res.status(500).json({ message: "The information can not be retreived" });
      });
})

//ADD A NEW  PROJECT
router.post("/", (req, res) => {
  const projectInfo = req.body;

  projectDb
    .insert(projectInfo)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      res.status(500).json({
        message: "There was an error saving the project to the database",
      });
    });
});

router.post('/:id/actions', (req, res) => {
    const newAction = {...req.body, project_id: req.params.id};
    actionDb.insert(newAction).then(action => {
      res.status(201).json(action);
    }).catch(e => {
      res.status(500).json({
        errorMessage: "There was an error while saving the action to the database"
      });
    });
})

//EDIT A PROJECT BY ID
router.put('/:id', (req, res) => {
    projectDb.update(req.params.id, req.body)
    .then((project) => {

          res.status(201).json(project);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: "There was an error trying updating" });
      });
})

//REMOVE A PROOJECT
router.delete("/:id", (req, res) => {
    projectDb.remove(req.params.id)
      .then((project) => {
        if (project > 0) {
          res.status(201).json({ message: "the project was deleted" });
        } else {
          res.status(404).json({ message: "not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: " there was an error" });
      });
  });

  
  

   


module.exports = router;
