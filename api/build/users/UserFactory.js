"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const UserEntity_1 = require("./../entity/UserEntity");
function UserFactory({ id, name, username, email, password, posts }) {
    const user = new UserEntity_1.UserEntity();
    user.id = id;
    user.name = name;
    user.email = email;
    user.username = username;
    user.password = password;
    user.posts = posts;
    return user;
}
exports.UserFactory = UserFactory;
//# sourceMappingURL=UserFactory.js.map