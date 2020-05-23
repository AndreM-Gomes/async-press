"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const UserEntity_1 = require("./../entity/UserEntity");
const typeorm_1 = require("typeorm");
class PostService {
    constructor() {
        this.connection = typeorm_1.getConnection();
    }
    async createPost(user, post) {
        const userRepository = this.connection.getRepository(UserEntity_1.UserEntity);
        const userRecord = await userRepository.findOneOrFail(user.id);
        post.user = userRecord;
        await this.connection.manager.save(post);
    }
}
exports.PostService = PostService;
//# sourceMappingURL=PostsService.js.map