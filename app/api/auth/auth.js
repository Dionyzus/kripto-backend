import express from "express";
import { checkDuplicateUsernameOrEmail } from '../../services/signupValidation';
import { signup, signin } from '../../controllers/authorization/auth';

const authRouter = express.Router();

authRouter.post("/signup", async function (req, res) {
    let result;
    try {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        result = await checkDuplicateUsernameOrEmail(req, res);
    } catch (error) {
        res.send({ message: error });
    }
    if (result) {
        try {
            await signup(req, res);
        } catch (error) {
            res.send({ message: error });
        }
    }
});

authRouter.post("/signin", async function (req, res) {
    try {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        console.log("Request: ", req.body);
        await signin(req, res);
    } catch (error) {
        res.send({ message: error });
    }
});

authRouter.get('/logout', function (req, res) {
    try {
        req.session.destroy();
        res.status(200).send({message: "User successfully logged out."});
    } catch (error){
        console.log(error);
    }
});

export default authRouter;