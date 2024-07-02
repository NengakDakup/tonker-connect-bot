import { CallbackQuery } from 'node-telegram-bot-api';
export declare const walletMenuCallbacks: {
    chose_wallet: typeof onChooseWalletClick;
    select_wallet: typeof onWalletClick;
    universal_qr: typeof onOpenUniversalQRClick;
};
declare function onChooseWalletClick(query: CallbackQuery, _: string): Promise<void>;
declare function onOpenUniversalQRClick(query: CallbackQuery, _: string): Promise<void>;
declare function onWalletClick(query: CallbackQuery, data: string): Promise<void>;
export {};
