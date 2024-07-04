"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
const User = mongoose_1.default.model('users', UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map