import express from 'express';
import {Post, IPost} from '../models/post';
//import path from 'path';
import multer from 'multer';
//import fs from 'fs'
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });


router.post('/', upload.single('image'), async (request, response) => {
  const { title, datePosted, dateEdited, content, imgSrc } = request.body;
  const user = request.user;
  let post: IPost
  //if post has file, else link
  if (request.file){
   post = new Post({
    title,
    content,
    datePosted,
    dateEdited,
    img: {
      data: request.file.buffer,
      contentType: request.file.mimetype
    },
    user
  });
  }else{
     post = new Post({
      title,
      content,
      datePosted,
      dateEdited,
      imgSrc,
      user
    });
  }


  const savedPost = await post.save();
  user.posts.push(savedPost._id);//concat?
  await user.save();
  return response.status(201).json(savedPost);
});

router.get('/', async (_request, response) => {
  const posts = await Post
    .find({}).populate('user');
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