const Post = require("../models").Post;

const getAll = async (req, res) => {
  try {
    const posts = await Post.findAll();

    return res.send(posts);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const create = async (req, res) => {
  try {
    const { name, email, text } = req.body;

    const newPost = await Post.create({
      name,
      email,
      text,
    });

    return res.send(newPost);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const edit = async (req, res) => {
  try {
    const { id, text } = req.body;
    const post = await Post.findByPk(id);
    post.set({
      text: text,
      status: "Edited by admin",
    });
    await post.save();
    return res.send({ success: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  getAll,
  create,
  edit,
};
