"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const PostFactory_1 = require("./PostFactory");
const UserFactory_1 = require("../users/UserFactory");
class PostsController {
    constructor(app, postsService, authUser) {
        this.app = app;
        this.authMiddleware = authUser;
        this.postsService = postsService;
    }
    init() {
        this.app.post('/post', this.authMiddleware, async (req, res) => {
            try {
                const authenticatedUser = UserFactory_1.UserFactory(JSON.parse(req.params.user));
                const post = PostFactory_1.PostFactory(req.body);
                this.postsService.createPost(authenticatedUser, post);
                return res.status(201).end();
            }
            catch (e) {
                return res.json(e).status(500).end();
            }
        });
    }
}
exports.PostsController = PostsController;
//# sourceMappingURL=PostsController.js.map