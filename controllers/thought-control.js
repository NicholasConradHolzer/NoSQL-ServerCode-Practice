
const { Thoughts, Users} = require("../models/modIndex");

const thoughtControl = {

  getAllthoughts(req, res) {
    Thoughts.find()
    .select('-__v')
    .then(dbUsersData => res.json(dbUsersData))
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getThoughtId({ params }, res) {
    Thoughts.findOne({ _id: params.thoughtId })
    .populate({
      path: 'reaction',
      select:'-__v'
    })
    .select('-__v')
    .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => {
          console.log(err);
          res.sendStatus(400);
      });
  },
  addThought({ body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: body.userId },
          { $push: { Thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtsData => {
        console.log(dbThoughtsData);
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No User found with this id' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

  updateThought(req, res) {
    Thoughts.findOneAndUpdate({ 
      _id: req.params.thoughtId }, {$set: req.body},
      {runValidators:true, new:true}
    )
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
    _id: req.params.thoughtId
  })
    .then(dbThoughtsData => {
      if (!dbThoughtsData) {
        return res.status(404).json({ 
          message: 'No thought with this id!' });
    }
      res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
},
  // add reaction to thought
  addReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _Id: req.params.thoughtId },
      { $push: { 
        reactions: {
        reactionBody: req.body.reactionBody,
        username: req.body.username 
                } 
              }
      },
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
    Thoughts.findOneAndDelete(

      {_id: req.params.thoughtId}
    )
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => res.json(err));
  },
 
    

    
}

module.exports = thoughtControl;