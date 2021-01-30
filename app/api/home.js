import express from "express";

//Test routes to check if server is set up properly.
const homeRouter = express.Router();

homeRouter.get("/", function (req, res) {
  res.send("Blockexplorer homepage");
});

homeRouter.get("/about", function (req, res) {
  res.send("About this blockexplorer");
});

export default homeRouter;
