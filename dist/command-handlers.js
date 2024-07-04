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
exports.handleShowMyWalletCommand = exports.handleDisconnectCommand = exports.handleConnectCommand = void 0;
const sdk_1 = require("@tonconnect/sdk");
const bot_1 = require("./bot");
const wallet_1 = require("./ton-connect/wallet");
const qrcode_1 = __importDefault(require("qrcode"));
const connector_1 = require("./ton-connect/connector");
const utils_1 = require("./utils");
const User_1 = __importDefault(require("./models/User"));
let newConnectRequestListenersMap = new Map();
function handleConnectCommand(msg) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const chatId = ((_a = msg.from) === null || _a === void 0 ? void 0 : _a.id) || msg.chat.id;
        let messageWasDeleted = false;
        (_b = newConnectRequestListenersMap.get(chatId)) === null || _b === void 0 ? void 0 : _b();
        const connector = (0, connector_1.getConnector)(chatId, () => {
            unsubscribe();
            newConnectRequestListenersMap.delete(chatId);
            deleteMessage();
        });
        yield connector.restoreConnection();
        if (connector.connected) {
            const connectedName = ((_c = (yield (0, wallet_1.getWalletInfo)(connector.wallet.device.appName))) === null || _c === void 0 ? void 0 : _c.name) ||
                connector.wallet.device.appName;
            yield bot_1.bot.sendMessage(chatId, `You have already connect ${connectedName} wallet\nYour address: ${(0, sdk_1.toUserFriendlyAddress)(connector.wallet.account.address, connector.wallet.account.chain === sdk_1.CHAIN.TESTNET)}\n\n Disconnect wallet firstly to connect a new one`);
            return;
        }
        const unsubscribe = connector.onStatusChange((wallet) => __awaiter(this, void 0, void 0, function* () {
            var _d, _e, _f, _g;
            if (wallet) {
                yield deleteMessage();
                const walletName = ((_d = (yield (0, wallet_1.getWalletInfo)(wallet.device.appName))) === null || _d === void 0 ? void 0 : _d.name) || wallet.device.appName;
                yield bot_1.bot.sendMessage(chatId, `
                ${walletName} wallet connected successfully
                Return to the game to start playing @Tonker01_bot
                `);
                // create or update the User Model with the new wallet address
                let user = yield User_1.default.findOne({ userid: chatId });
                if (user) {
                    if (user.wallet !== wallet.account.address) {
                        user.wallet = wallet.account.address;
                        yield user.save();
                    }
                }
                else {
                    let username = ((_e = msg.from) === null || _e === void 0 ? void 0 : _e.username) ? msg.from.username : (((_f = msg.from) === null || _f === void 0 ? void 0 : _f.last_name) ? `${msg.from.first_name}${msg.from.last_name}` : (_g = msg.from) === null || _g === void 0 ? void 0 : _g.first_name);
                    let newUser = new User_1.default({
                        username: username,
                        userid: chatId,
                        wallet: wallet.account.address,
                        games: [{
                                queryid: msg.chat.id,
                                score: 0
                            }],
                        total_score: 0,
                        highest_score: 0
                    });
                    yield newUser.save();
                }
                unsubscribe();
                newConnectRequestListenersMap.delete(chatId);
            }
        }));
        const wallets = yield (0, wallet_1.getWallets)();
        const link = connector.connect(wallets);
        const image = yield qrcode_1.default.toBuffer(link);
        const keyboard = yield (0, utils_1.buildUniversalKeyboard)(link, wallets);
        const botMessage = yield bot_1.bot.sendPhoto(chatId, image, {
            reply_markup: {
                inline_keyboard: [keyboard]
            }
        });
        const deleteMessage = () => __awaiter(this, void 0, void 0, function* () {
            if (!messageWasDeleted) {
                messageWasDeleted = true;
                yield bot_1.bot.deleteMessage(chatId, botMessage.message_id);
            }
        });
        newConnectRequestListenersMap.set(chatId, () => __awaiter(this, void 0, void 0, function* () {
            unsubscribe();
            yield deleteMessage();
            newConnectRequestListenersMap.delete(chatId);
        }));
    });
}
exports.handleConnectCommand = handleConnectCommand;
function handleDisconnectCommand(msg) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const chatId = ((_a = msg.from) === null || _a === void 0 ? void 0 : _a.id) || msg.chat.id;
        const connector = (0, connector_1.getConnector)(chatId);
        yield connector.restoreConnection();
        if (!connector.connected) {
            yield bot_1.bot.sendMessage(chatId, "You didn't connect a wallet");
            return;
        }
        yield connector.disconnect();
        yield bot_1.bot.sendMessage(chatId, 'Wallet has been disconnected');
    });
}
exports.handleDisconnectCommand = handleDisconnectCommand;
function handleShowMyWalletCommand(msg) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const chatId = ((_a = msg.from) === null || _a === void 0 ? void 0 : _a.id) || msg.chat.id;
        const connector = (0, connector_1.getConnector)(chatId);
        yield connector.restoreConnection();
        if (!connector.connected) {
            yield bot_1.bot.sendMessage(chatId, "You didn't connect a wallet");
            return;
        }
        const walletName = ((_b = (yield (0, wallet_1.getWalletInfo)(connector.wallet.device.appName))) === null || _b === void 0 ? void 0 : _b.name) ||
            connector.wallet.device.appName;
        yield bot_1.bot.sendMessage(chatId, `Connected wallet: ${walletName}\nYour address: ${(0, sdk_1.toUserFriendlyAddress)(connector.wallet.account.address, connector.wallet.account.chain === sdk_1.CHAIN.TESTNET)}`);
    });
}
exports.handleShowMyWalletCommand = handleShowMyWalletCommand;
//# sourceMappingURL=command-handlers.js.map