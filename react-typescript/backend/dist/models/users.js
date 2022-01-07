"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, default: "female" },
}, { timestamps: true });
const User = (0, mongoose_1.model)('users', userSchema);
exports.default = User;
//# sourceMappingURL=users.js.map