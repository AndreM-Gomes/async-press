"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typeorm_1 = require("typeorm");
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserEntity_1 = require("../entity/UserEntity");
class UserService {
    constructor() {
        this.connection = typeorm_1.getConnection();
    }
    async signUp({ name, password, email, username }) {
        const passwordHashed = await argon2_1.default.hash(password);
        const user = new UserEntity_1.UserEntity();
        user.email = email;
        user.name = name;
        user.password = passwordHashed;
        user.username = username;
        await this.connection.manager.save(user);
        const userRecord = await this.connection.manager.findOne(UserEntity_1.UserEntity, { where: { username } });
        return {
            username: userRecord.username,
            token: generateJWT(userRecord)
        };
    }
    async login(username, password) {
        const userRepository = this.connection.getRepository(UserEntity_1.UserEntity);
        const userRecord = await userRepository.findOne({ where: { username } });
        const correctPassword = await argon2_1.default.verify(userRecord.password, password);
        if (!correctPassword)
            throw new Error('Incorrect username or password');
        return {
            username: userRecord.username,
            token: generateJWT(userRecord)
        };
    }
    async findUserById(id) {
        const user = await this.connection.manager.findOne(UserEntity_1.UserEntity, { where: { id } });
        return user;
    }
}
exports.UserService = UserService;
const generateJWT = (user) => {
    return jsonwebtoken_1.default.sign({
        data: {
            _id: user.id,
            username: user.username
        }
    }, 'hello', { expiresIn: '6h' });
};
//# sourceMappingURL=UserService.js.map