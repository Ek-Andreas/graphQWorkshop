const mongoose = require("./db");

const forumPostSchema = new mongoose.Schema({
  title: String,
  text: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
});

const answerSchema = new mongoose.Schema({
  text: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

const ForumPost = mongoose.model("ForumPost", forumPostSchema);
const Answer = mongoose.model("Answer", answerSchema);

module.exports = {
  ForumPost,
  Answer,
};
