const config = require("config");
const {verify} = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");
const express = require("express");
require("dotenv/config")

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
 
    if (!token) {throw new UnauthorizedError("Tizimga kiring");}
    const secrect = config.get("jwt_secret")
    const decoded = verify(token, process.env.JWT_SECRET ,function(err, token) {
      if (err) {
          console.log(err);
      } else {
          console.log(token);
      }})
// console.log(decoded)
    next();
  } catch (error) {
    console.log('Error', error);
    next(error);
  }
};
module.exports = isLoggedIn;