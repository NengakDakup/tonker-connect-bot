import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
        unique: true,
    },
    wallet: {
        type: String,
    },
    total_score: {
        type: Number,
        required: true
    },
    highest_score: {
        type: Number,
        required: true,
        default: 0
    },
    games: [
        {
            queryid: {
                type: String,
                required: true,
                unique: true
            },
            score: {
                type: Number,
                required: true
            }
        },
    ],
}, {
    timestamps: true
});

const User = mongoose.model('users', UserSchema);
export default User;