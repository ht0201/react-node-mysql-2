const express = require('express');
const { validateToken } = require('../middleware/AuthMiddleware');
const app = express();
const router = express.Router();
const { Comments } = require('../models');

router.get('/', async (req, res) => {
  const comments = await Comments.findAll();
  res.json(comments);
});

router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post('/', validateToken, async (req, res) => {
  const comment = req.body;
  comment.username = req.user.username
  const newComment = await Comments.create(comment);
  res.json(newComment);
});

router.delete('/:commentId', validateToken, async (req, res) =>
{
  const commentId = req.params.commentId;
  console.log(commentId);

  await Comments.destroy({
    where: {
      id: commentId
    }
  });

  res.json('DELETED SUCCESSFULLY')
})


module.exports = router;
