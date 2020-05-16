module.exports = (app, UserService,authUser) => {

  app.post('/user/user-signup', async (req, res) => {
    try{
      const userReq = req.body
      const { user, token } = await UserService.signUp(userReq)
      return res.json({ user, token }).status(201).end()
    }catch(e){
      return res.json(e).status(500).end()
    }
  })

  app.post('/user/login', async (req, res) => {
    try{
      const {username, password} = req.body
      const user = await UserService.login(username, password)
      console.log(user)
      return res.status(201).json(user).end()
    }catch(e){
      return res.json(e).status(401).end()
    }
  })
}