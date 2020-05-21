

export default class PostsService{

  async getPosts() {
    const response = await this.post()
    return response
  }

   post() {
    return {
      posts: [
        { 
          index: 0,
          title: "Como fazer um clone do DEV Comunity",
          content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam voluptatem eius consectetur nulla, autem delectus, corporis explicabo deserunt corrupti vero, voluptatibus reprehenderit quia illo dolore ipsam? Facilis qui eum tenetur?"
        },
        {
          index: 1,
          title: "Como Aprender React Na Pratica Durante Uma Quarentena",
          content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam voluptatem eius consectetur nulla, autem delectus, corporis explicabo deserunt corrupti vero, voluptatibus reprehenderit quia illo dolore ipsam? Facilis qui eum tenetur?"
        },
        {
          index: 2,
          title: "Como Aprender React Na Pratica Durante Uma Quarentena",
          content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam voluptatem eius consectetur nulla, autem delectus, corporis explicabo deserunt corrupti vero, voluptatibus reprehenderit quia illo dolore ipsam? Facilis qui eum tenetur?"
        },      
      ]
    }
  }
}
