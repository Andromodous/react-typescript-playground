import express, { Application, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/users'


dotenv.config();
const app: Application = express();
const port: number = 5000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECTION).then((result) => console.log(`connected to mongoDB `))
    .catch(err => console.log(`failed to connect to mongoDB : ${err}`));


app.post('/register', async (req: Request, res: Response) => {
    var { username, password, age, gender } = req.body; //destructure payload
    try {
        if (!username || !password|| !age || !gender ) {
            throw new Error("a field is empty, try again");
        }
        password = await bcrypt.hash(password, 10);
        const user = new User({ username, password, age, gender });  //create document schema
        const results = await user.save(); //save user to datebase
        var token = jwt.sign({ userId: results._id as number }, process.env.PRIVATE_KEY, { expiresIn: 60 * 30 }); //create JWT token
        res.status(200).json({ userId: results._id, token }); //response in JSON
    }
    catch (e) {
        console.log("there is an error ", e.message);
        res.status(400).json({ error: `${e.message}` })
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
                var token = jwt.sign({ userID: user._id }, process.env.PRIVATE_KEY, { expiresIn: 60 * 30 }); //create JWT token 
                user && res.status(200).json({ userID: user._id, token });
            }
            else {
                throw new Error("password is empty or incorrect");
            }
        }
        catch (e) {
            console.log(`there was an error `, e.message);
            res.status(400).json({ error: "username or password incorrect, try again" });
        }
    }
    catch (e) {
        console.log(`there was a problem signing in ${e}`);
        res.status(400).json({ error: "username or password incorrect, try again" });
    }
})


app.listen(port, () => {
    console.log(`Server is running at port ${port}.`);
});