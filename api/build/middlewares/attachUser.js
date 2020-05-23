"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function AuthUser(userService) {
    return async (req, res, next) => {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        console.log(token);
        if (!token)
            return res.status(401).end();
        console.log(`user service -> ${userService}`);
        const decodedToken = jsonwebtoken_1.default.verify(token, 'hello');
        console.log(decodedToken);
        if (!decodedToken)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token' }).end();
        const user = await userService.findUserById(decodedToken.data._id);
        if (!user) {
            res.status(401).end();
        }
        req.params.user = JSON.stringify(user);
        next();
    };
}
exports.AuthUser = AuthUser;
//# sourceMappingURL=attachUser.js.map