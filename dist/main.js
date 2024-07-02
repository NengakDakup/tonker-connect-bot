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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bot_1 = require("./bot");
const connect_wallet_menu_1 = require("./connect-wallet-menu");
const command_handlers_1 = require("./command-handlers");
const storage_1 = require("./ton-connect/storage");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, storage_1.initMongoDB)();
        const callbacks = Object.assign({}, connect_wallet_menu_1.walletMenuCallbacks);
        bot_1.bot.on('callback_query', query => {
            if (!query.data) {
                return;
            }
            let request;
            try {
                request = JSON.parse(query.data);
            }
            catch (_a) {
                return;
            }
            if (!callbacks[request.method]) {
                return;
            }
            callbacks[request.method](query, request.data);
        });
        bot_1.bot.onText(/\/connect/, command_handlers_1.handleConnectCommand);
        bot_1.bot.onText(/\/disconnect/, command_handlers_1.handleDisconnectCommand);
        bot_1.bot.onText(/\/wallet/, command_handlers_1.handleShowMyWalletCommand);
        bot_1.bot.onText(/\/start/, (msg) => {
            bot_1.bot.sendMessage(msg.chat.id, `
This is the Tonker Game Connect Wallet Bot.
            
Commands list: 
/connect - Connect to a wallet
/wallet - Show connected wallet
/disconnect - Disconnect from the wallet
`);
        });
        bot_1.bot.on("polling_error", (msg) => console.log(msg));
    });
}
main();
//# sourceMappingURL=main.js.map