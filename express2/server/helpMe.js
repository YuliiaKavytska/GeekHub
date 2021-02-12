const {Router} = require('express');
const router = Router();
const {resolve} = require('path');
const fs = require('fs/promises');
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.use(bodyParser.urlencoded({extended: true}));
// "/all"
router.get("/todo/:num?/:edit?", (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'client', 'build', 'index.html'));

});
module.exports = router;