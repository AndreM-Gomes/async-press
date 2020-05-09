module.exports = (app,service) => {
  app.get('/users',service.getUsers);

}