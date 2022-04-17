const {Schema, model, Types} = require('mongoose');
const dateFormat = require('./utils/dateFormat');
let ReactionSchema = require('./Reactions')
const ThoughtSchema = new Schema({
    thoughtId:{
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    thoughtText:{
        type: String,
        required: true,
        minLength: 1,
        maxlength: 280
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username:{
        type: String,
        required: true
    },
    reactions:[ReactionSchema]
},
{
    toJSON:{
        virtuals: true,
        getters: true
    },
    id: false
}
)

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length})

    
const Thought = model('Thought', ThoughtSchema)
module.exports = Thought