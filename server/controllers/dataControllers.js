const Data = require('../models/data.js');

module.exports.fetchData = async (req,res) => {
    try {
        const data = await Data.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json("Something went wrong...");
    }
};