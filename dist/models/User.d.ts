import mongoose from 'mongoose';
declare const User: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    userid: string;
    total_score: number;
    highest_score: number;
    games: mongoose.Types.DocumentArray<{
        queryid: string;
        score: number;
    }>;
    wallet?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    userid: string;
    total_score: number;
    highest_score: number;
    games: mongoose.Types.DocumentArray<{
        queryid: string;
        score: number;
    }>;
    wallet?: string | null | undefined;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    userid: string;
    total_score: number;
    highest_score: number;
    games: mongoose.Types.DocumentArray<{
        queryid: string;
        score: number;
    }>;
    wallet?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    userid: string;
    total_score: number;
    highest_score: number;
    games: mongoose.Types.DocumentArray<{
        queryid: string;
        score: number;
    }>;
    wallet?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    userid: string;
    total_score: number;
    highest_score: number;
    games: mongoose.Types.DocumentArray<{
        queryid: string;
        score: number;
    }>;
    wallet?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    userid: string;
    total_score: number;
    highest_score: number;
    games: mongoose.Types.DocumentArray<{
        queryid: string;
        score: number;
    }>;
    wallet?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default User;
