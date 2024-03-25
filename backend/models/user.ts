import {Schema, model, Document} from 'mongoose';
//import uniqueValidator from 'mongoose-unique-validator'

export interface IUser extends Document {
    username: string;
    name: string;
    passwordHash: string
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

