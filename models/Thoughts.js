const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');
// let ReactionSchema = require('./Reactions')


// const {Schema, model, Types} = require('mongoose');
// const dateFormat = require('../utils/dateFormat');
// const { truckMonster } = require('fontawesome');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody:{
        type: String,
        required: "Reactions require Text Input",
        trim: true,
        maxlength: 280
    },
    username:{
        type: String,
        required: "Username is Required"
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get:(createdAtVal) => dateFormat(createdAtVal)
    },
},
{
    toJSON:{
        getters: true
    },
    id: false
});
// const Reaction = model('Reaction', ReactionSchema)


const ThoughtSchema = new Schema({
    thoughtId:{
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    thoughtText:{
        type: String,
        required: "Thoughts require Text Input",
        minLength: 1,
        maxlength: 280,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    reactions: [ ReactionSchema ]
    },
{
    toJSON:{
        virtuals: true,
        getters: true
    },
    id: false
}
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length})

    
const Thoughts = model('Thoughts', ThoughtSchema)
module.exports = Thoughts