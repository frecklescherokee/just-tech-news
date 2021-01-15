// import sequilize
const { Model, DataTypes } = require('sequelize');
// require connection.db, which creates the connection to the DB
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {
    // add a model method to see a voted post's updated data + the number of votes that post has
    // "static" indicates that this is a model method, not an instance method
    static upvote(body, models) {
        return models.Vote.create({
          user_id: body.user_id,
          post_id: body.post_id
        }).then(() => {
          return Post.findOne({
            where: {
              id: body.post_id
            },
            attributes: [
              'id',
              'post_url',
              'title',
              'created_at',
              [
                sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                'vote_count'
              ]
            ]
          });
        });
      }
    }

    
// create fields/columns for Post model
Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      post_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );

module.exports = Post;