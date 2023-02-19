const db = require("../models");
const User = db.user;

// open access
exports.allRequestAccess = (req, res) => {
  User.find(
    {},
    { username: 1, requests: 1, _id: 0 },
    { limit: 100 },
    (err, user) => {
      if (!err) {
        res.send(user);
      }
    }
  ).skip(0);
};

exports.userBoard = (req, res) => {
  User.find((err, user) => {
    if (!err) {
      res.send(user);
    }
  });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// save the user service request:

exports.userRequest = (req, res) => {
  const title = req.body.title;
  const timestamp = new Date().toISOString();
  const userId = req.userId;

  // save the data into mongodb.
  User.updateOne(
    { _id: userId },
    {
      $push: {
        requests: {
          title,
          timestamp,
        },
      },
    },
    (err) => {
      if (err) {
        res.status(200).send({ message: "request not saved" });
      }
    }
  );

  res.status(200).send({ message: "request saved" });
};

// request progress by moderator

exports.userRequestProgress = (req, res) => {
  const title = req.body.title;
  const timestamp = new Date().toISOString();
  const icon = req.body.icon;
  const request_id = req.body.request_id;
  User.updateOne(
    { "requests._id": request_id },
    {
      $push: {
        "requests.$[request].request_progress": {
          title,
          timestamp,
          icon,
        },
      },
    },
    {
      arrayFilters: [
        {
          "request._id": request_id,
        },
      ],
    },
    (err) => {
      if (err) {
        res.status(200).send("request not saved");
        console.log(err);
      } else {
        res.status(200).send("request saved");
      }
    }
  );
};

// engagement from user

exports.userRequestEngagement = async (req, res) => {
  const engagementType = req.body.engagement;
  const request_id = req.body.request_id;
  const key = `requests.$[request].engagement.${engagementType}`;
  let object = {};
  await User.findById(req.userId, (err, u) => {
    if (!err) {
      req.username = u.username;
      // console.log(req.username);
    } else req.username = "unknown";
  });
  object[key] = req.username;
  // console.log(object);
  User.updateOne(
    { "requests._id": request_id },
    {
      $push: object,
    },
    {
      arrayFilters: [
        {
          "request._id": request_id,
        },
      ],
    },
    (err) => {
      if (err) {
        res.status(200).send("request not saved");
        console.log(err);
        console.log(engagementType);
      } else {
        res.status(200).send("request saved");
      }
    }
  );
};
// check the x-access-token verified or not

exports.isVerified = (req, res) => {
  res.status(200).send({ message: "verified" });
};
