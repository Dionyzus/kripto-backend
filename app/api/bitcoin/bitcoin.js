import express from "express";
import RpcClient from "bitcoind-rpc";
import fs from 'fs';

let rpc;
fs.readFile('D:\Kriptovalute\clientConfig.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  rpc = new RpcClient(data);
})

const bitcoinRouter = express.Router();

bitcoinRouter.get("/blockchain-info", function (req, res) {
    rpc.getBlockchainInfo(function (err, ret) {
        if (err) {
            console.error(err);
            res.status(500).send({ message: err });
        } else {
            res.json(ret);
        }
    });
});

bitcoinRouter.get("/block-hash", function (req, res) {
    rpc.getBlockHash(1906665, function (err, ret) {
        if (err) {
            console.error(err);
            res.status(500).send({ message: err });
        } else {
            res.json(ret);
        }
    });
});

bitcoinRouter.get("/block", function (req, res) {
    rpc.getBlock(
        "00000000506fb217bfba4fa3a2c1cef74204381bd573dbebc20a5106d8bb8c0a",
        function (err, ret) {
            if (err) {
                console.error(err);
                res.status(500).send({ message: err });
            } else {
                res.json(ret);
            }
        }
    );
});

bitcoinRouter.get("/raw-transaction/:txId", function (req, res) {
    rpc.getRawTransaction(
        req.params.txId,
        function (err, tx) {
            if (err) {
                console.error(err);
                res.status(500).send({ message: err });
            } else {
                rpc.decodeRawTransaction(tx.result, function (err, decodedTx) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({ message: err });
                    } else {
                        res.json(decodedTx);
                    }
                });
            }
        }
    );
});

bitcoinRouter.get("/mempool-info", function (req, res) {
    rpc.getMemPoolInfo(function (err, ret) {
        if (err) {
            console.error(err);
            res.status(500).send({ message: err });
        } else {
            res.json(ret);
        }
    });
});

bitcoinRouter.get("/raw-mempool", function (req, res) {
    rpc.getRawMemPool(1, function (err, ret) {
        if (err) {
            console.error(err);
            res.status(500).send({ message: err });
        } else {
            res.json(ret);
        }
    });
});

bitcoinRouter.get("/transactions", async function (req, res) {
    rpc.getRawMemPool(function (err, ret) {
        if (err) {
            console.error(err);
            res.status(500).send({message: err});
        } else {
            res.status(200).json(ret);
        }
    });
});

export default bitcoinRouter;
