const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

module.exports = ( userModel ) => {
  const signUp = async ( user ) => {
    const passwordHashed = await argon2.hash(user.password)

    const userRecord = await userModel.create({
      name: user.name,
      username: user.username,
      email: user.email,
      password: passwordHashed
    })
    return {
      username: userRecord.username,
      token: generateJWT(userRecord)
    }
  }
  const login = async ( username, password) => {
    const userRecord = await userModel.findOne({ where: {username: username}})
    const correctPassword = await argon2.verify(userRecord.password, password)
    if(!correctPassword) throw new Error('Incorrect username or password')
    return {
      user: {
        username: userRecord.username,
        token: generateJWT(userRecord)
      }
    }
  }
  const generateJWT = (user) => {
    return jwt.sign({
      data: {
        _id: user.id,
        username: user.username
      }
    },'MySuP3R_z3kr3t.', { expiresIn: '6h'})
  }
  const findUserById = async ( id ) => {
    return await userModel.findByPk(id)
  }
  return {
    signUp,
    login,
    findUserById
  }
}