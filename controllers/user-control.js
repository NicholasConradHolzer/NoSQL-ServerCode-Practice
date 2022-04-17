const { Users  } = require('../models');

const userControl = {
  // get all Users
getAllUsers(req, res) {
    Users.find()
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    // .populate('friends')
    .populate({
        path:'friends',
        select:'-__v'
    })
      .select('-__v')
      
      .sort({ _id: -1 })
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one User by id
  getUserId({ params }, res) {
  Users.findOne(
      { _id: params.userId }
      )
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      // .populate('friends')
      .populate({
          path:'friends',
          select:'-__v'
      })
      .select('-__v')
      .then(dbUsersData => {
        if (!dbUsersData){
          res.status(404).json({
            message:"no user found with this ID"})
           return;}res.json(dbUsersData);})
      .catch(err => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },

  // createUsers
createUsers({ body }, res) {
    Users.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.status(500).json(err));
  },

  // update Users by id
updateUsers({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.userId }, 
      body, { 
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
deleteUsers({ params, body }, res) {
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
      // { new: true, runValidators: true }
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
    // console.log(params)

    Users.findOneAndDelete(
      { _id: params.userId },
      // { $pull: { friends: params.friendId  } },
      // { new: true, runValidators: true }
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