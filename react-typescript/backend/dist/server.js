"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./models/users"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGODB_CONNECTION).then((result) => console.log(`connected to mongoDB `))
    .catch(err => console.log(`failed to connect to mongoDB : ${err}`));
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var { username, password, age, gender } = req.body; //destructure payload
    try {
        password = yield bcryptjs_1.default.hash(password, 10);
    }
    catch (e) {
        console.log(e);
    }
    const user = new users_1.default({ username, password, age, gender }); //create document schema
    const results = yield user.save(); //save user to datebase
    var token = jsonwebtoken_1.default.sign({ userId: results._id }, process.env.PRIVATE_KEY, { expiresIn: 60 * 30 }); //create JWT token
    res.status(200).json({ id: results._id, token }); //response in JSON
}));
app.listen(port, () => {
    console.log(`Server is running at port ${port}.`);
});
//# sourceMappingURL=server.js.map