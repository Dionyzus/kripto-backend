import express from "express";
import RpcClient from "bitcoind-rpc";
import fs from 'fs';

let rpc;
fs.readFile('D:\\Kriptovalute\\clientConfig.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  rpc = new RpcClient(JSON.parse(data));
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

bitcoinRouter.get("/block-hash/:blockHeight", function (req, res) {
    rpc.getBlockHash(req.params.blockHeight, function (err, ret) {
        if (err) {
            console.error(err);
            res.status(500).send({ message: err });
        } else {
            res.json(ret);
        }
    });
});

bitcoinRouter.get("/block/:blockHash", function (req, res) {
    rpc.getBlock(
        req.params.blockHash,
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

bitcoinRouter.get("/search/:term", async function (req, res) {
    try {
        rpc.getBlock(
            req.params.term,
            function (err, ret) {
                if (err) {
                    console.error(err);
                } else {
                    res.json(ret);
                }
            }
        ); 
        try {
            rpc.getRawTransaction(
                req.params.term,
                function (err, tx) {
                    if (err) {
                        console.error(err);
                    } else {
                        rpc.decodeRawTransaction(tx.result, function (err, decodedTx) {
                            if (err) {
                                console.error(err);
                            } else {
                                res.json(decodedTx);
                            }
                        });
                    }
                }
            );
        } catch (error) {
            res.status(404).json({message: "Could not find searched data."})
        }
    } catch (error) {
        res.status(404).json({message: "Could not find searched data."})
    }
});

export default bitcoinRouter;
