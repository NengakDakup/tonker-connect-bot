import { WalletInfoRemote } from '@tonconnect/sdk';
import { InlineKeyboardButton } from 'node-telegram-bot-api';
export declare const AT_WALLET_APP_NAME = "telegram-wallet";
export declare const pTimeoutException: unique symbol;
export declare function pTimeout<T>(promise: Promise<T>, time: number, exception?: unknown): Promise<T>;
export declare function addTGReturnStrategy(link: string, strategy: string): string;
export declare function convertDeeplinkToUniversalLink(link: string, walletUniversalLink: string): string;
export declare function buildUniversalKeyboard(link: string, wallets: WalletInfoRemote[]): Promise<InlineKeyboardButton[]>;
export declare function CheckTokenBalance(walletAddress: string): Promise<number>;
