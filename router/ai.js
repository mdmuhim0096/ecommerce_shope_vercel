const route = require("express").Router();
const { consider } = require("../model/AI");

route.get("/:type/:value", async (req, res) => {
    try {
        const { type, value } = req.params;
        const response = await consider(type, value);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error in ai router" })
    }
})

module.exports = route;