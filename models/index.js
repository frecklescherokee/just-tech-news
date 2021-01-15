/////////// this file is for collecting and exporting the various models data

const User = require("./User");
const Post = require("./Post");
const Vote = require('./Vote');

// create associations relating User to Post for Post ownership relationship
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// create associations between User and Post for Votes (many to many)
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});
  
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// create associations between the Vote table and Post table so 
// we can count how many Votes a Post got 
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

// create associations between the Vote table and Post table so
// we can count how many Votes a User made
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});




module.exports = { User, Post, Vote };
