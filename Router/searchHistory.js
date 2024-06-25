require("dotenv").config();
require("../Database/database");
const express = require("express");
const searchHistoryModel = require("../Models/searchHistory");
const searchHistory = express.Router();

searchHistory.post("/add-search-history/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const {search} = req.body;
    const isExist = await searchHistoryModel.findOne({search,email})
    if(isExist){
      res.status(201).json({
          sucess: true,
          message: "history save successfully"
      });
      return
    }
    const result = await searchHistoryModel.create({
        email,
        search
    })
    res.status(201).json({
        sucess: true,
        message: "history save successfully"
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

searchHistory.get("/get-history", async (req, res) => {
  try {
    
    const result = await searchHistoryModel.find();

    res.status(200).json({
        sucess: true,
        history: result
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});




module.exports = searchHistory;
