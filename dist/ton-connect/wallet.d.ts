import { WalletInfoRemote } from '@tonconnect/sdk';
export declare function getWallets(): Promise<WalletInfoRemote[]>;
export declare function getWalletInfo(walletAppName: string): Promise<WalletInfoRemote | undefined>;
