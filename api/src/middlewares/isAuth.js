const jwt = require('express-jwt')

const getTokenFromHeader = ( req ) => {
  if(req.get('authorization') && 
  req.get('authorization').split(' ')[0] === 'Bearer'){
      return req.get('authorization').split(' ')[1]
  }
}

module.exports = jwt({
  secret: 'MySuP3R_z3kr3t.',
  
  userProperty: 'token',

  getToken: getTokenFromHeader
})