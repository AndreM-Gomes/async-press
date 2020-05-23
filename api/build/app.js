"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const PostsController_1 = require("./posts/PostsController");
const PostsService_1 = require("./posts/PostsService");
const attachUser_1 = require("./middlewares/attachUser");
const typeorm_1 = require("typeorm");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express = require("express");
const userController_1 = require("./users/userController");
const UserService_1 = require("./users/UserService");
const app = express();
const port = 3000;
async function start() {
    try {
        console.log('Starting server...');
        app.use(body_parser_1.default.json());
        app.use(cors_1.default());
        typeorm_1.createConnection().then(() => {
            console.log('Starting User endpoints...');
            const userService = new UserService_1.UserService();
            const authMiddleware = attachUser_1.AuthUser(userService);
            console.log(userService);
            const userController = new userController_1.UserController(app, userService, authMiddleware);
            userController.init();
            console.log('User endpoints started...');
            const postService = new PostsService_1.PostService();
            const postController = new PostsController_1.PostsController(app, postService, authMiddleware);
            postController.init();
        });
        return app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    }
    catch (e) {
        console.log(`Uncaught exception => ${e}`);
    }
}
exports.start = start;
//# sourceMappingURL=app.js.map