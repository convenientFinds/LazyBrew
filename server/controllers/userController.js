const User = require('../models/userModel');
const { createErr } = require('../utils/utils');
const axios = require('axios')

const userController = {};

// user Mongoose find
userController.getAllusers = async (req, res, next) => {
  try {
    const dbRes = await User.find({});
    res.locals.users = dbRes;
  } catch (err) {
    return next(
      createErr({
        method: 'getAllusers',
        type: 'db query error',
        err,
      })
    );
  }
  return next();
};

userController.postBreweryRecommendation = async (req, res, next) => {
  console.log(req.body)
  try {
    User.create({
      nameOfUser: req.body.nameOfUser,
      nameOfBrewery: req.body.nameOfBrewery,
      nameOfHotel: req.body.nameOfHotel,
      statusOfBrewery: req.body.statusOfBrewery,
      statusOfHotel: req.body.statusOfHotel,
      created: req.body.created
    })
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'getAllusers',
        type: 'db query error',
        err,
      })
    );
  }
};

userController.changeRecommendation = async (req, res, next) => {
  console.log(req.body)
  try {
    await User.findOneAndUpdate({ _id: req.body.id }, { statusOfBrewery: req.body.statusOfBrewery, statusOfHotel: req.body.statusOfHotel })
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'getAllusers',
        type: 'db query error',
        err,
      })
    );
  }
};

userController.getAllHotels = async (req, res, next) => {
  try {
    const optionsHotels = {
      method: 'GET',
      url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
      params: { query: 'seattle', locale: 'en_US', currency: 'USD' },
      // params: { query: req.body.city, locale: 'en_US', currency: 'USD' },
      headers: {
        'X-RapidAPI-Key': '213bf8eeb6mshabac5e8f6740a32p17141djsnbf46e85640b0',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
      }
    };

    axios.request(optionsHotels)
      .then((response) => {
        console.log(response.data.suggestions[1]['entities'], 'hotel response')
      }
      )
    return next()
  } catch (err) {
    return next(
      createErr({
        method: 'getAllHotels',
        type: 'db query error',
        err,
      })
    );
  }
}

module.exports = userController;
