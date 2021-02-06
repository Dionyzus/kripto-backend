import express from "express";
import axios from 'axios';
import {getPrices, savePrice} from '../../services/price';

const marketRouter = express.Router();

marketRouter.get("/prices", async function (req, res) {
    try {
        const response = await axios.get('https://blockchain.info/ticker');
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

marketRouter.get("/stats", async function (req, res) {
    try {
        const response = await axios.get('https://api.blockchain.info/stats');
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

marketRouter.post("/save-price", async function (req, res) {
    try {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        await savePrice(req, res);
    } catch (error) {
        res.send({ message: error });
    }
});

marketRouter.get("/saved-prices/:currency", async function (req, res) {
    try {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        await getPrices(req, res);
    } catch (error) {
        res.send({ message: error });
    }
});

export default marketRouter;