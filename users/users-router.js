const router = require("express").Router();

const Users = require("./usersModel.js");

router.get("/", (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error getting list of users" });
    });
});

router.post("/", (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Error adding user, please try again" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(removed => {
      if (removed) {
        res.status(200).json(removed);
      } else {
        res
          .status(404)
          .json({ message: "Could not delete specific user with that ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Error deleting user, please try again" });
    });
});

module.exports = router;
