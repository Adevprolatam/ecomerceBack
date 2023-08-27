const {Router} = require('express');
const router = Router();

const {getItemsAll, createItem} = require("../controllers/item");

//Todo: Route ITEMS 
router.get("/", getItemsAll);
router.post("/", createItem);
module.exports = router;