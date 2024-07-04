"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionSchema = new mongoose_1.default.Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
    chatId: { type: String, required: true },
    balance: { type: Number },
});
exports.default = mongoose_1.default.model('Connection', connectionSchema);
//# sourceMappingURL=Connection.js.map