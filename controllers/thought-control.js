// const req = require('express/lib/request');
const {Reactions, Thoughts, Users} = require('../models');

const thoughtControl = {

  getAllthoughts(req, res) {
    Thoughts.find({})
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
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
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      console.log(deletedthought)
      return Users.findOneAndUpdate(
        { thoughts: params.id},  
        { $pull: { thoughts: params.id } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
},
  // add reaction to thought
  addReaction({ params, body }, res) {
    console.log('Hello')
    console.log('params', params)
    Thoughts.findOneAndUpdate(
      { thoughtId: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
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

  // remove thought
  
  // remove Reaction
  removeReaction({ params }, res) {
    console.log('params', params)
    Thoughts.findOneAndUpdate(
      { thoughtId: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
 
    
    // get one User by id
    
}

module.exports = thoughtControl;