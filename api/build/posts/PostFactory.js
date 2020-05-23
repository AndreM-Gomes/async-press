"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFactory = void 0;
const PostEntity_1 = require("./../entity/PostEntity");
function PostFactory({ id, title, minsToRead, content, likesNumber, user }) {
    const post = new PostEntity_1.PostEntity();
    post.id = id;
    post.title = title;
    post.minsToRead = minsToRead;
    post.content = content;
    post.likesNumber = likesNumber;
    post.user = user;
    return post;
}
exports.PostFactory = PostFactory;
//# sourceMappingURL=PostFactory.js.map