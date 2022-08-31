const userService = require("../service/user-service.js");

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res) {
    try {
      res.send("got users");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
