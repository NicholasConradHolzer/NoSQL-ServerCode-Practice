const {Schema, model, Types} = require('mongoose');
const dateFormat = require('./utils/dateFormat');

const UserSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: 'Username is required.',
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    userSince:{
        type: Date,
        default: Date.now,
        get:(userSinceVal) => dateFormat(userSinceVal)
    },
    thoughts:[{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends:[{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
},
{
    toJSON:{
        virtuals: true,
        getters: true
    },
    id: false
})

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;});

const Users = model('Users', UserSchema)

module.exports = Users