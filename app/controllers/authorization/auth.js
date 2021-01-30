import { secret } from '../../config/authConfig';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function signup(req, res) {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: await hashPassword(req.body.password, 8)
        });
        let saveUser = await newUser.save();
        console.log("New user signed in: ", saveUser);
        res.status(201).send({ message: "User was registered successfully!" });
    } catch (err) {
        console.log("An error occurred. Failed to save data!");
        res.status(500).send(err);
    }
}

async function hashPassword(password, saltRounds) {
    return bcrypt.hash(password, saltRounds);
}

export async function signin(req, res) {
    let user;
    try {
        user = await User.findOne({ username: req.body.username });
    } catch (error) {
        return res.status(500).send({ message: error });
    }

    if (!user) {
        return res.status(404).send({ message: "User not found!" });
    }

    const isPasswordValid = bcrypt.compare(req.body.password,
        user.password);

    if (!isPasswordValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid password!"
        });
    }

    let token;

    try {
        token = jwt.sign({ id: user._id }, secret, {
            expiresIn: 86400
        });
    } catch (error) {
        console.log(error);
    }

    req.session.key = user._id;
    res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
    });
}