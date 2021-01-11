/////////// this file is for collecting and exporting the various models data

const User = require("./User");
const Post = require("./Post");

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };
