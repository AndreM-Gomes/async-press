"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(app, userService, authUser) {
        this.app = app;
        this.userService = userService;
        this.authUser = authUser;
    }
    init() {
        this.app.post('/user/signup', async (req, res) => {
            try {
                const userReq = req.body;
                console.log(`SignUp User: ${req.body}`);
                const { username, token } = await this.userService.signUp(userReq);
                return res.json({ username, token }).status(201).end();
            }
            catch (e) {
                return res.json(e).status(500).end();
            }
        });
        this.app.post('/user/login', async (req, res) => {
            try {
                const { username, password } = req.body;
                const user = await this.userService.login(username, password);
                console.log(user);
                return res.status(201).json(user).end();
            }
            catch (e) {
                return res.json(e).status(401).end();
            }
        });
        this.app.get('/user/login', async (req, res) => {
            res.json({ ok: true }).end();
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map