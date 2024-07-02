import TelegramBot from 'node-telegram-bot-api';
export declare function handleConnectCommand(msg: TelegramBot.Message): Promise<void>;
export declare function handleDisconnectCommand(msg: TelegramBot.Message): Promise<void>;
export declare function handleShowMyWalletCommand(msg: TelegramBot.Message): Promise<void>;
