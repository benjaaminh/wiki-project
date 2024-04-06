import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {User} from '../models/user';
import { SECRET } from '../utils/config';
const router = express.Router();
router.post('/', async (request, response) => {
  if (!SECRET) {
    throw new Error('Secret key is not defined in the environment variables.');
  }
  console.log('secret',SECRET);
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  
  const token = jwt.sign
  (userForToken, SECRET,// as secret? idk
    { expiresIn:60*60 });

  return response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

export default router;