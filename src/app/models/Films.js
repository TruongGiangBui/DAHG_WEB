const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Film = new mongoose.Schema({
  movie_name_eng: { type: String, default: '' },
  movie_name_vie: { type: String, default: '' },
  poster_link: { type: String, default: '' },
  trailer_link: { type: String, default: '' },
  film_link: { type: String, default: '' },
  film_content: { type: String, default: '' },
  status: { type: String, default: '' },
  idmb: { type: String, default: '' },
  director: { type: String, default: '' },
  country: { type: String, default: '' },
  release_date: { type: String, default: '' },
  timespan: { type: String, default: '' },
  quality: { type: String, default: '' },
  resolution: { type: String, default: '' },
  slug: { type: String, default: '' },
  views:{type:Number,default:0},
});

module.exports = mongoose.model('Film', Film);
