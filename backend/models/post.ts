import { time } from 'console';
import {Schema, model, Document} from 'mongoose';
//import uniqueValidator from 'mongoose-unique-validator'

export interface IPost extends Document {
    title: string;
    datePosted: Date;
    dateEdited: Date;
    content: string;
    imgSrc: string;
}
const postSchema = new Schema<IPost>({
  title: {
    type:String,
    required:true,
    unique:true,
    minlength:1
  },
  datePosted: {
    type:Date,
    default:Date.now()
  },
  dateEdited:{
    type:Date,
    default:Date.now()
  },
  content:{
    type:String,
    required:true,
    minlength:1
  },
  imgSrc: {
    type: String
  }
});
//userSchema.plugin(uniqueValidator)

postSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed  }
}});

export const Post = model<IPost>('Post', postSchema);

