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
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUniversalKeyboard = exports.convertDeeplinkToUniversalLink = exports.addTGReturnStrategy = exports.pTimeout = exports.pTimeoutException = exports.AT_WALLET_APP_NAME = void 0;
const sdk_1 = require("@tonconnect/sdk");
exports.AT_WALLET_APP_NAME = 'telegram-wallet';
exports.pTimeoutException = Symbol();
function pTimeout(promise, time, exception = exports.pTimeoutException) {
    let timer;
    return Promise.race([
        promise,
        new Promise((_r, rej) => (timer = setTimeout(rej, time, exception)))
    ]).finally(() => clearTimeout(timer));
}
exports.pTimeout = pTimeout;
function addTGReturnStrategy(link, strategy) {
    const parsed = new URL(link);
    parsed.searchParams.append('ret', strategy);
    link = parsed.toString();
    const lastParam = link.slice(link.lastIndexOf('&') + 1);
    return link.slice(0, link.lastIndexOf('&')) + '-' + (0, sdk_1.encodeTelegramUrlParameters)(lastParam);
}
exports.addTGReturnStrategy = addTGReturnStrategy;
function convertDeeplinkToUniversalLink(link, walletUniversalLink) {
    const search = new URL(link).search;
    const url = new URL(walletUniversalLink);
    if ((0, sdk_1.isTelegramUrl)(walletUniversalLink)) {
        const startattach = 'tonconnect-' + (0, sdk_1.encodeTelegramUrlParameters)(search.slice(1));
        url.searchParams.append('startattach', startattach);
    }
    else {
        url.search = search;
    }
    return url.toString();
}
exports.convertDeeplinkToUniversalLink = convertDeeplinkToUniversalLink;
function buildUniversalKeyboard(link, wallets) {
    return __awaiter(this, void 0, void 0, function* () {
        const atWallet = wallets.find(wallet => wallet.appName.toLowerCase() === exports.AT_WALLET_APP_NAME);
        const atWalletLink = atWallet
            ? addTGReturnStrategy(convertDeeplinkToUniversalLink(link, atWallet === null || atWallet === void 0 ? void 0 : atWallet.universalLink), process.env.TELEGRAM_BOT_LINK)
            : undefined;
        const keyboard = [
            {
                text: 'Choose a Wallet',
                callback_data: JSON.stringify({ method: 'chose_wallet' })
            },
            {
                text: 'Open Link',
                url: `https://ton-connect.github.io/open-tc?connect=${encodeURIComponent(link)}`
            }
        ];
        if (atWalletLink) {
            keyboard.unshift({
                text: '@wallet',
                url: atWalletLink
            });
        }
        return keyboard;
    });
}
exports.buildUniversalKeyboard = buildUniversalKeyboard;
//# sourceMappingURL=utils.js.map