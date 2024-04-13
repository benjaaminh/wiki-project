import {Schema, model, Document} from 'mongoose';
import { IUser } from './user';
//import uniqueValidator from 'mongoose-unique-validator'

export interface IPost extends Document {
    title: string;
    datePosted: Date;
    dateEdited: Date;
    content: string;
    imgSrc: string;
    user: IUser
    img: {//image file
      data: Buffer,
      contentType: string
    }
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
  },
  user:{
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  img:{
    data: Buffer,
    contentType: String
  }

});
//userSchema.plugin(uniqueValidator)

postSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
}});

export const Post = model<IPost>('Post', postSchema);

