import { Price } from '../models/price';
import moment from 'moment';
import querystring from 'querystring';
import url from 'url';

export async function savePrice(req, res) {
    try {
        const newPrice = new Price({
            currency: req.body.currency,
            buy: req.body.buy,
            sell: req.body.sell,
            date: moment().toDate()
        });
        console.log(newPrice);
        const savePrice = await newPrice.save();
        res.status(201).send({ message: "Price was saved successfully!" });
    } catch (err) {
        console.log("An error occurred. Failed to save data!");
        res.status(500).send(err);
    }
}

export async function getPrices(req, res) {
    let prices = null;
    try {
        const criteria = req.query.criteria;
        const order = req.query.order;
        prices = await Price.find({currency: req.params.currency}).sort({[criteria]: order});
        res.status(200).send(prices);
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

