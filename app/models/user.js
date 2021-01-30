import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String
});

export const User = mongoose.model('User', UserSchema);
