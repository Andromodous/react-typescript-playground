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
        password = await bcrypt.hash(password, 10);
    }
    catch (e) {
        console.log(e);
    }
    const user = new User({ username, password, age, gender });  //create document schema
    const results = await user.save(); //save user to datebase
    var token = jwt.sign({ userId: results._id as number }, process.env.PRIVATE_KEY, { expiresIn: 60 * 30 }); //create JWT token
    res.status(200).json({ userId: results._id, token }); //response in JSON
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}.`);
});