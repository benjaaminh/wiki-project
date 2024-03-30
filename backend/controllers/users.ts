import express from 'express';
import bcryptPackage from 'bcrypt';
import {User, IUser} from '../models/user';
const router = express.Router();
router.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password){
    return response.status(400).json({
        error:'no password given'
    });
  }
  if (password.length <3){
    return response.status(400).json({
        error:'password minimum length is 3 characters'
    });
  }
  
  const saltRounds = 10;
  const passwordHash = await bcryptPackage.hash(password, saltRounds);

  const user : IUser = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.status(201).json(savedUser);
});

router.get('/', async (_request, response) => {
  const users = await User
    .find({}).populate('posts');
  response.json(users);
});

router.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  if (user) {
    response.json(user);
  } else {
    response.status(404).end();
  }
});

export default router;