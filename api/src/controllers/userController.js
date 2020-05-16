module.exports = (app, UserModel) => {

  const UserService = require('../services/userService')(UserModel)


  app.post('/user/user-signup', async (req, res) => {
    try{
      const userReq = req.body
      const { user, token } = await UserService.signUp(userReq)
      return res.json({ user, token }).status(201).end()
    }catch(e){
      return res.json(e).status(500).end()
    }
  })
}