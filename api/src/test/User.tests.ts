import chai from 'chai'
import chaiHttp from 'chai-http'
import jsonwebtoken from 'jsonwebtoken'

chai.use(chaiHttp)
const expect = chai.expect
// tslint:disable-next-line: no-var-requires

const user = {
  name: 'Chai Latte',
  password: 'chai',
  email: 'chai@latte.com',
  username: 'chai'
}
const post = {
	title: 'coronavirus',
	minsToRead: '19',
	content: 'the end of the world',
	likesNumber: '19'
}

async function test(){
  const server = 'localhost:3000'

  describe('Authenticate', () => {
    describe('POST /post',() => {
      it('it should create a post',(done) => {
        chai.request(server)
        .post('/user/signup')
        .send(user)
        .then((res) => {
          const auth = res.body
          expect(res).to.have.status(201)
        chai.request(server)
        .post('/post')
        .set('Authorization','Bearer '+auth.token)
        .send(post)
        .then(res => {
          expect(res).to.have.status(201)
        })
        done()
      })
    })
    })
  })

}
test()
