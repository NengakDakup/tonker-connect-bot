import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    key: string;
    value: string;
    chatId: string;
    balance?: number | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    key: string;
    value: string;
    chatId: string;
    balance?: number | null | undefined;
}> & {
    key: string;
    value: string;
    chatId: string;
    balance?: number | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    key: string;
    value: string;
    chatId: string;
    balance?: number | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    key: string;
    value: string;
    chatId: string;
    balance?: number | null | undefined;
}>> & mongoose.FlatRecord<{
    key: string;
    value: string;
    chatId: string;
    balance?: number | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
