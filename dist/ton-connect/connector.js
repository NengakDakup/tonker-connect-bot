"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnector = void 0;
const sdk_1 = __importDefault(require("@tonconnect/sdk"));
const storage_1 = require("./storage");
const process = __importStar(require("process"));
const connectors = new Map();
function getConnector(chatId, onConnectorExpired) {
    let storedItem;
    if (connectors.has(chatId)) {
        storedItem = connectors.get(chatId);
        clearTimeout(storedItem.timeout);
    }
    else {
        storedItem = {
            connector: new sdk_1.default({
                manifestUrl: process.env.MANIFEST_URL,
                storage: new storage_1.TonConnectStorage(chatId)
            }),
            onConnectorExpired: []
        };
    }
    if (onConnectorExpired) {
        storedItem.onConnectorExpired.push(onConnectorExpired);
    }
    storedItem.timeout = setTimeout(() => {
        if (connectors.has(chatId)) {
            const storedItem = connectors.get(chatId);
            storedItem.connector.pauseConnection();
            storedItem.onConnectorExpired.forEach(callback => callback(storedItem.connector));
            connectors.delete(chatId);
        }
    }, Number(process.env.CONNECTOR_TTL_MS));
    connectors.set(chatId, storedItem);
    return storedItem.connector;
}
exports.getConnector = getConnector;
//# sourceMappingURL=connector.js.map