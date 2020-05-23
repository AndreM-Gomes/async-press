"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEntity = void 0;
const UserEntity_1 = require("./UserEntity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
let PostEntity = /** @class */ (() => {
    let PostEntity = class PostEntity {
    };
    __decorate([
        typeorm_2.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], PostEntity.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PostEntity.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], PostEntity.prototype, "minsToRead", void 0);
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], PostEntity.prototype, "content", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], PostEntity.prototype, "likesNumber", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' }),
        __metadata("design:type", Date)
    ], PostEntity.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.ManyToOne(type => UserEntity_1.UserEntity, user => user.posts),
        __metadata("design:type", UserEntity_1.UserEntity)
    ], PostEntity.prototype, "user", void 0);
    PostEntity = __decorate([
        typeorm_3.Entity()
    ], PostEntity);
    return PostEntity;
})();
exports.PostEntity = PostEntity;
//# sourceMappingURL=PostEntity.js.map