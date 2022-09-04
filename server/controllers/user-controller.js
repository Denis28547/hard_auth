const userService = require("../service/user-service.js");
const { validationResult } = require("express-validator");

const ApiError = require("../exceptions/api-error");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Error on validation", errors.errors));
      }

      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      returnCookies(res, userData);

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      returnCookies(res, userData);

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (err) {
      next(err);
    }
  }

  async activate(req, res) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      returnCookies(res, userData);

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res) {
    try {
      const allUsers = await userService.getAllUsers();
      return res.json(allUsers);
    } catch (err) {
      next(err);
    }
  }
}

function returnCookies(res, userData) {
  return res.cookie("refreshToken", userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
}

module.exports = new UserController();
