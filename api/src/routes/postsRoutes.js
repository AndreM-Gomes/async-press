module.exports = (app,service) => {
  app.get('/posts',service.getPosts);

}