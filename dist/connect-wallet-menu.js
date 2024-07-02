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
exports.walletMenuCallbacks = void 0;
const wallet_1 = require("./ton-connect/wallet");
const bot_1 = require("./bot");
const connector_1 = require("./ton-connect/connector");
const qrcode_1 = __importDefault(require("qrcode"));
const fs = __importStar(require("fs"));
const sdk_1 = require("@tonconnect/sdk");
const utils_1 = require("./utils");
exports.walletMenuCallbacks = {
    chose_wallet: onChooseWalletClick,
    select_wallet: onWalletClick,
    universal_qr: onOpenUniversalQRClick
};
function onChooseWalletClick(query, _) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const wallets = yield (0, wallet_1.getWallets)();
        let walletOpts = wallets.map(wallet => ([
            {
                text: wallet.name,
                callback_data: JSON.stringify({ method: 'select_wallet', data: wallet.appName })
            }
        ]));
        yield bot_1.bot.editMessageReplyMarkup({
            inline_keyboard: [
                ...walletOpts,
                [
                    {
                        text: '« Back',
                        callback_data: JSON.stringify({
                            method: 'universal_qr'
                        })
                    }
                ]
            ]
        }, {
            message_id: (_a = query.message) === null || _a === void 0 ? void 0 : _a.message_id,
            chat_id: (_b = query.message) === null || _b === void 0 ? void 0 : _b.chat.id
        });
    });
}
function onOpenUniversalQRClick(query, _) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const chatId = query.message.chat.id;
        const wallets = yield (0, wallet_1.getWallets)();
        const connector = (0, connector_1.getConnector)(chatId);
        const link = connector.connect(wallets);
        yield editQR(query.message, link);
        const keyboard = yield (0, utils_1.buildUniversalKeyboard)(link, wallets);
        yield bot_1.bot.editMessageReplyMarkup({
            inline_keyboard: [keyboard]
        }, {
            message_id: (_a = query.message) === null || _a === void 0 ? void 0 : _a.message_id,
            chat_id: (_b = query.message) === null || _b === void 0 ? void 0 : _b.chat.id
        });
    });
}
function onWalletClick(query, data) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const chatId = query.message.chat.id;
        const connector = (0, connector_1.getConnector)(chatId);
        const selectedWallet = yield (0, wallet_1.getWalletInfo)(data);
        if (!selectedWallet) {
            return;
        }
        let buttonLink = connector.connect({
            bridgeUrl: selectedWallet.bridgeUrl,
            universalLink: selectedWallet.universalLink
        });
        let qrLink = buttonLink;
        if ((0, sdk_1.isTelegramUrl)(selectedWallet.universalLink)) {
            buttonLink = (0, utils_1.addTGReturnStrategy)(buttonLink, process.env.TELEGRAM_BOT_LINK);
            qrLink = (0, utils_1.addTGReturnStrategy)(qrLink, 'none');
        }
        yield editQR(query.message, qrLink);
        yield bot_1.bot.editMessageReplyMarkup({
            inline_keyboard: [
                [
                    {
                        text: '« Back',
                        callback_data: JSON.stringify({ method: 'chose_wallet' })
                    },
                    {
                        text: `Open ${selectedWallet.name}`,
                        url: buttonLink
                    }
                ]
            ]
        }, {
            message_id: (_a = query.message) === null || _a === void 0 ? void 0 : _a.message_id,
            chat_id: chatId
        });
    });
}
function editQR(message, link) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = 'QR-code-' + Math.round(Math.random() * 10000000000);
        yield qrcode_1.default.toFile(`./${fileName}`, link);
        yield bot_1.bot.editMessageMedia({
            type: 'photo',
            media: `attach://${fileName}`
        }, {
            message_id: message === null || message === void 0 ? void 0 : message.message_id,
            chat_id: message === null || message === void 0 ? void 0 : message.chat.id
        });
        yield new Promise(r => fs.rm(`./${fileName}`, r));
    });
}
//# sourceMappingURL=connect-wallet-menu.js.map