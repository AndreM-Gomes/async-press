"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const app_1 = require("../app");
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
// tslint:disable-next-line: no-var-requires
async function test() {
    const server = await app_1.start();
    describe('POST /user', () => {
        describe('/user/signup', () => {
            it('it should register one user and response jwt', (done) => {
                chai_1.default.request(server)
                    .post('/user/signup')
                    .send({
                    name: 'Chai Latte',
                    email: 'chai@latte.com',
                    username: 'chai',
                    password: 'chai'
                })
                    .then((res) => {
                    expect(res.status).equal(201);
                    done();
                })
                    .catch(err => {
                    console.log(err);
                });
            });
        });
    });
}
test();
//# sourceMappingURL=User.tests.js.map