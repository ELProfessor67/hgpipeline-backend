const mongoose = require("mongoose");
const userData = require("./user")

const SearchHistory = new mongoose.Schema({
    email: {
        type: String,
    },
    search: {
      type: String,  
    }
},{timestamps: true});



const SearchHistoryModel = mongoose.model("searchHistory", SearchHistory);

module.exports = SearchHistoryModel;
