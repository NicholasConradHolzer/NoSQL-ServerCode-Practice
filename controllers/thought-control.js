// const req = require('express/lib/request');
const {/*Reaction,*/ Thoughts, Users} = require('../models');

const thoughtControl = {

  getAllthoughts(req, res) {
    Thoughts.find({})
    .select('-__v')
    .then(dbUsersData => res.json(dbUsersData))
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getThoughtId({ params }, res) {
    Thoughts.findOne({ _id: params.id })
    .populate({
      path: 'reaction',
      select:'-__v'
    })
    .select('-__v')
    .then(dbthoughtsData => res.json(dbthoughtsData))
      .catch(err => {
          console.log(err);
          res.sendStatus(400);
      });
  },
  // add thought to User
  addThought({ body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbthoughtsData => {
        console.log(dbthoughtsData);
        if (!dbthoughtsData) {
          res.status(404).json({ message: 'No User found with this id' });
          return;
        }
        res.json(dbthoughtsData);
      })
      .catch(err => res.json(err));
  },

  updateThought(req, res) {
    Thoughts.findOneAndUpdate({ 
      _id: req.params.id }, {$set: req.body},
      {runValidators:true, new:true}
    )
      // body, { new: true, runValidators: true })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.status(400).json(err))
  },

  removeThought(req, res) {
  Thoughts.findOneAndDelete({ 
    _id: params.id 
  })
    .then(dbThoughtsData => {
      if (!dbThoughtsData) {
        return res.status(404).json({ 
          message: 'No thought with this id!' });
    }
      // return Users.findOneAndUpdate(
      //   { thoughts: params.id},  
      //   { $pull: { thoughts: params.id } },
      //   { new: true }
      // );
    // })
    // .then(dbThoughtsData => {
    //   if (!dbThoughtsData) {
    //     res.status(404).json({ message: 'No User found with this id!' });
    //     return;
    //   }
      res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
},
  // add reaction to thought
  addReaction(req, res) {
    // console.log('Hello')
    // console.log('params', params)
    Thoughts.findOneAndUpdate(
      { _Id: params.thoughtId },
      { $push: { 
        Reaction: {
        reactionBody: req.body.reactionBody,
        username: req.body.username 
                } 
              }
      },
      // {runValidators:true, new:true}
    )
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

  // remove thought
  
  // remove Reaction
  removeReaction(req, res) {
    // console.log('params', params)
    Thoughts.findOneAndDelete(
      // { thoughtId: params.thoughtId },
      // { $pull: { Reaction: { reactionId: params.reactionId } } },
      // { new: true }
      {_id: req.params.thoughtId}
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
 
    
    // get one User by id
    
}

module.exports = thoughtControl;