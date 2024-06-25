const mongoose = require('mongoose');

const ads = new mongoose.Schema({
  video: {type: String},
  link: {type: String},
  description: {type: String},
  title: {type: String},
  click: {type: Number, default: 0},
  CTR: {type: Number, default: 0},
  views: {type: Number, default: 0},
},{timestamps: true});

module.exports = mongoose.model('ads', ads);
