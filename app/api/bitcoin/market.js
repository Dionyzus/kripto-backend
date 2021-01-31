import express from "express";
import axios from 'axios';

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

export default marketRouter;