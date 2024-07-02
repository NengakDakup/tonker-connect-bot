import dotenv from 'dotenv';
dotenv.config();

import { bot } from './bot';
import { walletMenuCallbacks } from './connect-wallet-menu';
import {
    handleConnectCommand,
    handleDisconnectCommand,
    handleShowMyWalletCommand
} from './command-handlers';
import TelegramBot from 'node-telegram-bot-api';
import { initMongoDB } from './ton-connect/storage';

async function main(): Promise<void> {
    await initMongoDB()

    const callbacks = {
        ...walletMenuCallbacks
    };

    bot.on('callback_query', query => {
        if (!query.data) {
            return;
        }

        let request: { method: string; data: string };

        try {
            request = JSON.parse(query.data);
        } catch {
            return;
        }

        if (!callbacks[request.method as keyof typeof callbacks]) {
            return;
        }

        callbacks[request.method as keyof typeof callbacks](query, request.data);
    });

    bot.onText(/\/connect/, handleConnectCommand);

    bot.onText(/\/disconnect/, handleDisconnectCommand);

    bot.onText(/\/wallet/, handleShowMyWalletCommand);

    bot.onText(/\/start/, (msg: TelegramBot.Message) => {
        bot.sendMessage(
            msg.chat.id,
            `
This is the Tonker Game Connect Wallet Bot.
            
Commands list: 
/connect - Connect to a wallet
/wallet - Show connected wallet
/disconnect - Disconnect from the wallet
`
        );
    });
}

main();