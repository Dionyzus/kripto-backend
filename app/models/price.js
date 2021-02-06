import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const PriceSchema = new Schema({
    currency: String,
    buy: Number,
    sell: Number,
    date: Date
});

export const Price = mongoose.model('Price', PriceSchema);
