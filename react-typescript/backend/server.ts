import express, { Application, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/users'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { escape } from 'querystring'

dotenv.config();
const app: Application = express();

app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(cookieParser());

mongoose.connect(process.env.MONGODB_CONNECTION).then((_result) => console.log(`connected to mongoDB `))
    .catch(err => console.log(`failed to connect to mongoDB : ${err}`));


app.post('/register', async (req: Request, res: Response) => {
    var { username, password, age, gender } = req.body; //destructure payload
    var user = await User.findOne({ username }); // checks if user already exists
    try {
        if (!username || !password || !age || !gender) {
            throw new Error("some fields may be empty, try again");
        }
        if (user !== null) {
            throw new Error("username is taken");
        }
        const salt = bcrypt.genSaltSync()
        password = await bcrypt.hash(password, salt);
        user = new User({ username, password, age, gender });  //create new user document 
        const results = await user.save(); //save user to datebase  
        var token = jwt.sign({ userId: results._id as number }, process.env.PRIVATE_KEY, { expiresIn: "20s" }); //create JWT token
        res.cookie('token', token, { sameSite: true, httpOnly: true, maxAge: 1000 * 60 * 60 }).status(200).json({ token }); //response in JSON
    }
    catch (e) {
        console.log("there is an error", e.message);
        res.status(200).json({ error: `${e.message}` })
    }
})


app.post('/signin', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }); //find user 
    try {
        if (!user) {
            throw new Error("user could not be found");
        }
        const verified: boolean = await bcrypt.compare(password, user.password);
        try {
            if (verified) {
                var token = jwt.sign({ userID: user._id }, process.env.PRIVATE_KEY, { expiresIn: "30m" }); //create JWT token
                user && res.cookie('token', token, { sameSite: true, httpOnly: true, maxAge: 1000 * 60 * 60 }).status(200).json({ token });
            }
            else {
                throw new Error("password is empty or incorrect");
            }
        }
        catch (e) {
            console.log(`there was an error `, e.message);
            res.status(200).json({ error: "username or password incorrect, try again" });
        }
    }
    catch (e) {
        console.log(`there was a problem signing in ${e}`);
        res.status(200).json({ error: "username or password incorrect, try again" });
    }
})

app.post('/authenticate', (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error("no token available");
        }
        jwt.verify(token, process.env.PRIVATE_KEY, (err, _result) => {
            if (err) {
                throw new Error('your jwt access token has expired');
            }
        });
        res.status(200).json({ token, valid: true });
    }
    catch (e) {
        res.status(401).json({ error: e.message, valid: false });
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}.`);
});