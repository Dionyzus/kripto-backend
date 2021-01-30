import { User } from '../models/user';

export async function checkDuplicateUsernameOrEmail(req, res) {
    let user = null;
    try {
        user = await User.findOne({ username: req.body.username });
    } catch (error) {
        res.status(500).send({ message: error });
    }
    if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return false;
    }
    try {
        user = await User.findOne({ email: req.body.email });
    } catch (error) {
        res.status(500).send({ message: error });
    }
    if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return false;
    }
    return true;
}
