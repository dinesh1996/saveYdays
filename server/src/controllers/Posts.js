const Post = require('../models/Post')

const Posts = {

  all: (req, res) => {
    Post.find({}, (error, posts) => {
      if (error) {
        console.error(error);
      }
      res.json({
        posts: posts
      })
    }).sort({
      _id: -1
    })
  },

  add: (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const new_post = new Post({
      title: title,
      description: description
    })
    new_post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.json({
        success: true
      })
    })
  },

  edit: (req, res) => {
    Post.findById(req.params.id, 'title description', function (error, post) {
      if (error) {
        console.error(error);
      }

      post.title = req.body.title
      post.description = req.body.description
      post.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.json({
          success: true
        })
      })

    })
  },

  delete: (req, res, next) => {
    Post.deleteOne({
      _id: req.params.id
    }, function (err, post) {
      if (err)
        next(err)
      res.json({
        success: true
      })
    })
  },

  get: (req, res) => {
    console.error('lala');
    Post.findById(req.params.id, 'title description', function (error, post) {
      if (error) {
        console.error(error);
      }
      res.json(post)
    })
  }

}
module.exports = Posts;