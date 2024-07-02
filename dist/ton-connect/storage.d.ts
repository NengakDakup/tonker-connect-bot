import { IStorage } from '@tonconnect/sdk';
export declare function initMongoDB(): Promise<void>;
export declare class TonConnectStorage implements IStorage {
    private readonly chatId;
    constructor(chatId: number);
    private getKey;
    removeItem(key: string): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string | null>;
}
