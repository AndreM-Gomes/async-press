const argon2 = require('argon2')
module.exports = ( userModel ) => {
  const signUp = async ( user ) => {
    const passwordHashed = await argon2.hash(user.password)

    await userModel.create({
      name: user.name,
      username: user.username,
      email: user.email,
      password: passwordHashed
    })
  }
  return {
    signUp
  }
}