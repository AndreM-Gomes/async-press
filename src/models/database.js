mysqlx.getSession('root:root@localhost:33060/blog')
    .then(session => {
       return session.getSchema('blog').getTable('user').select().execute(row => console.log(row))
    })
 