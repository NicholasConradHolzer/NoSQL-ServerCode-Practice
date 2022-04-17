const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    username:{
        type: String,
        unique: true,
        required: 'Username is required.',
        trim: true
    },
    email:{
        type: String,
        required: 'email address required',
        unique: true,
        match: [/.+@.+\..+/, "please enter a valid email addrerss"]
    },
    userSince:{
        type: Date,
        default: Date.now,
        get:(userSinceVal) => dateFormat(userSinceVal)
    },
    thoughts:[{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
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
    return this.friends.length;})

const Users = model('Users', UserSchema)

module.exports = Users