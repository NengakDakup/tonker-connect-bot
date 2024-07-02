"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TonConnectStorage = exports.initMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Connection_1 = __importDefault(require("../models/Connection"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const storage = new Map(); // temporary storage implementation. We will replace it with the redis later
function initMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.DB) {
            yield mongoose_1.default.connect(process.env.DB);
            console.log('MongoDB Connected');
        }
        else {
            throw new Error('DB connection string not found in environment variables');
        }
    });
}
exports.initMongoDB = initMongoDB;
class TonConnectStorage {
    constructor(chatId) {
        this.chatId = chatId;
    } // we need to have different stores for different users 
    getKey(key) {
        return this.chatId.toString() + key; // we will simply have different keys prefixes for different users
    }
    removeItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Connection_1.default.deleteOne({ key: this.getKey(key) });
        });
    }
    setItem(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Connection_1.default.updateOne({ key: this.getKey(key) }, { key: this.getKey(key), value, chatId: this.chatId }, { upsert: true });
        });
    }
    getItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection = yield Connection_1.default.findOne({ key: this.getKey(key) });
            return (connection === null || connection === void 0 ? void 0 : connection.value) || null;
        });
    }
}
exports.TonConnectStorage = TonConnectStorage;
//# sourceMappingURL=storage.js.map