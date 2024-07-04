import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    key: string;
    value: string;
    chatId: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    key: string;
    value: string;
    chatId: string;
}> & {
    key: string;
    value: string;
    chatId: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    key: string;
    value: string;
    chatId: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    key: string;
    value: string;
    chatId: string;
}>> & mongoose.FlatRecord<{
    key: string;
    value: string;
    chatId: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
