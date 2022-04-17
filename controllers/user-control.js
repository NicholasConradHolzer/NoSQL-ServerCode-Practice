const { Users  } = require("../models/Users");

const userControl = {
  // get all Users
getAllUsers(req, res) {
    Users.find()
      .then(dbUsersData => {res.json(dbUsersData)})
  },

  getUserId(req, res) {
  Users.findOne(
      { _id: req.params.userId }
      )
      .populate('friends')
      .populate('Thoughts')

    .then(dbUsersData => {
      if (!dbUsersData){ 
        res.status(404).json({message:"no user found with this ID"})
        return;
      } 
        res.json(dbUsersData)}
      )
    .catch(err => {console.log(err);res.sendStatus(400).json(err);})
      },
  // createUsers
createUsers({ body }, res) {
    Users.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.status(500).json(err));
  },

  // update Users by id
updateUsers(req, res) {
    Users.findOneAndUpdate({ _id: req.params.userId }, 
      {$set: req.body}, { 
        new: true, 
        runValidators: true 
      })
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No Users found with this id!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch(err => res.json(err));
  },

  // delete Users
deleteUsers({ params}, res) {
    Users.findOneAndDelete({ _id: params.userId })
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({
            message: 'No User at ID'
          });
          return;
        }
        res.json(dbUsersData)
      })
      .catch(err => res.json(err));
  },

  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  removeFriend({ params }, res) {

    Users.findOneAndDelete(
      { _id: params.userId },
    )
      .then(dbUsersData => { 
        if (!dbUsersData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(dbUsersData);})
      .catch(err => res.json(err));
  }
 
};

module.exports = userControl;