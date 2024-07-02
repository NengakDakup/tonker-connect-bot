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
exports.getWalletInfo = exports.getWallets = void 0;
const sdk_1 = require("@tonconnect/sdk");
const walletsListManager = new sdk_1.WalletsListManager({
    cacheTTLMs: Number(process.env.WALLETS_LIST_CACHE_TTL_MS)
});
function getWallets() {
    return __awaiter(this, void 0, void 0, function* () {
        const wallets = yield walletsListManager.getWallets();
        return wallets.filter(sdk_1.isWalletInfoRemote);
    });
}
exports.getWallets = getWallets;
function getWalletInfo(walletAppName) {
    return __awaiter(this, void 0, void 0, function* () {
        const wallets = yield getWallets();
        return wallets.find(wallet => wallet.appName.toLowerCase() === walletAppName.toLowerCase());
    });
}
exports.getWalletInfo = getWalletInfo;
//# sourceMappingURL=wallet.js.map