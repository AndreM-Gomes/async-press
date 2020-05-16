module.exports = (userService, jwt) => {
  const getTokenFromHeader = ( req ) => {
    if(req.get('authorization') && 
    req.get('authorization').split(' ')[0] === 'Bearer'){
        return req.get('authorization').split(' ')[1]
        
    }
  }
  const authUser = async (req, res, next) => {

    const token = getTokenFromHeader(req)

    if(!token) return res.status(401).end()
    
    jwt.verify(token,'MySuP3R_z3kr3t.' , async function(err, decodedToken) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }).end()
      const user = await userService.findUserById(decodedToken.data._id)
      if(!user){
        res.status(401).end()
      }
      req.params.user = user
      next();
    });
  }
  return authUser
} 
