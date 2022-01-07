
import { Document, Schema, model } from 'mongoose'

interface IUser extends Document {
    username : string,
    password : string,
    age : number,
    gender : string
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, default: "female" },
}, { timestamps: true });

const User = model<IUser>('users', userSchema);

export default User;