const express = require('express');
const { validateToken } = require('../middleware/AuthMiddleware');
const router = express.Router();
const { Likes } = require("../models");

router.post('/', validateToken, async (req, res) =>
{
  const { PostId } = req.body;
  const {id: userId} = req.user;

  const found = await Likes.findOne({
    where: { userId, PostId: PostId }
  })

  if (!found) {
    let objLike = await Likes.create({ PostId: PostId, userId }); 
    res.json({ liked: true, itemLike: objLike})
  } else {
    await Likes.destroy({
      where: {
        PostId: PostId,
        userId,
      }
    })
    res.json({ liked: false, itemLike: found})
  }
})



module.exports = router;