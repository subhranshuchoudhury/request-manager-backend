const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    name: String,
    password: String,
    requests: [
      {
        title: String,
        timestamp: String,
        overall_progress: Number,
        request_progress: [
          // tracking your progress
          {
            title: String,
            timestamp: String,
            icon: String,
          },
        ],
        chats: [
          {
            timestamp: String,
            sender_username: String,
          },
        ],
        engagement: {
          like: [String],
          dislike: [String],
        },
      },
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
