const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/requests", [authJwt.verifyToken], controller.allRequestAccess);

  // app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );

  // user request route

  app.post("/api/user/request", [authJwt.verifyToken], controller.userRequest);

  // moderator update request progress

  app.post(
    "/api/user/requestprogress",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.userRequestProgress
  );

  // user engagement

  app.post(
    "/api/user/requestengagement",
    [authJwt.verifyToken],
    controller.userRequestEngagement
  );

  app.get("/api/verify", [authJwt.verifyToken], controller.isVerified);
};
