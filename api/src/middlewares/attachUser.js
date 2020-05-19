module.exports = (userService) => {
  const attachUsers = (req, res, next) => {
    try{
      const decodedUser = req.token.data 
      const user = await userService.findUserById(decodedUser._id)
      if(!user){
        res.status(401).end()
      }
      req.currentUser = user
      return next()
    } catch(e){
      return res.json(e).status(500)
    }

  }
  return{
    attachUsers
  }
} 