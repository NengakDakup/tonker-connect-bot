import { IStorage } from '@tonconnect/sdk';
import mongoose from 'mongoose';
import Connection from '../models/Connection';

import dotenv from 'dotenv';
dotenv.config();

const storage = new Map<string, string>(); // temporary storage implementation. We will replace it with the redis later


export async function initMongoDB(): Promise<void> {
  if (process.env.DB) {
    await mongoose.connect(process.env.DB)
    console.log('MongoDB Connected');
  } else {
    throw new Error('DB connection string not found in environment variables')
  }
}

export class TonConnectStorage implements IStorage {
  constructor(private readonly chatId: number) {} // we need to have different stores for different users 

  private getKey(key: string): string {
    return this.chatId.toString() + key; // we will simply have different keys prefixes for different users
  }

  async removeItem(key: string): Promise<void> {
    await Connection.deleteOne({ key: this.getKey(key) });
  }

  async setItem(key: string, value: string): Promise<void> {
    await Connection.updateOne({ key: this.getKey(key) }, { key: this.getKey(key), value }, { upsert: true });
  }

  async getItem(key: string): Promise<string | null> {
    let connection = await Connection.findOne({ key: this.getKey(key) });
    return connection?.value || null;
  }
}