import dotenv from 'dotenv';
dotenv.config();

import { bot } from './bot';
import { getWallets } from './ton-connect/wallet';
import QRCode from 'qrcode';
import { getConnector } from './ton-connect/connector';

bot.onText(/\/connect/, async msg => {
    const chatId = msg.chat.id;
    const wallets = await getWallets();

    const connector = getConnector(chatId);

    connector.onStatusChange(wallet => {
        if (wallet) {
            bot.sendMessage(chatId, `${wallet.device.appName} wallet connected!`);
        }
    });

    const tonkeeper = wallets.find(wallet => wallet.appName === 'tonkeeper')!;

    const link = connector.connect({
        bridgeUrl: tonkeeper.bridgeUrl,
        universalLink: tonkeeper.universalLink
    });
    const image = await QRCode.toBuffer(link);

    await bot.sendPhoto(chatId, image);
});