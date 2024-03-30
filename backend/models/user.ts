import {Schema, model, Document} from 'mongoose';
import { IPost } from './post';
//import uniqueValidator from 'mongoose-unique-validator'

export interface IUser extends Document {
    username: string;
    name: string;
    passwordHash: string;
    posts: IPost[]; //check type whether mongoose schema types objectid or this, also check in post.ts
}
const userSchema = new Schema<IUser>({
  username: {
    type:String,
    required:true,
    unique:true,
    minlength:3
  },
  name: String,
  passwordHash: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref:'Post'
    }
  ]
});
//userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  }
});

export const User = model<IUser>('User', userSchema);

