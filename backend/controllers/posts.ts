import express from 'express';
import bcryptPackage from 'bcrypt';
import {Post, IPost} from '../models/post';
const router = express.Router();
router.post('/', async (request, response) => {
  const { title, datePosted, dateEdited, content, imgSrc } = request.body;

  if (!title){
    return response.status(400).json({
        error:'no password given'
    });
  }
  if (title.length <1){
    return response.status(400).json({
        error:'password minimum length is 3 characters'
    });
  }


  const post : IPost = new Post({
    title,
    content,
    datePosted,
    dateEdited,
    imgSrc
  });

  const savedPost = await post.save();

  return response.status(201).json(savedPost);
});

router.get('/', async (_request, response) => {
  const posts = await Post
    .find({});
  response.json(posts);
});

router.get('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id);
  if (post) {
    response.json(post);
  } else {
    response.status(404).end();
  }
});

export default router;