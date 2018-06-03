import defineRoutes from '../src/defineRoutes';

describe('#defineRoutes', () => {
  const routesMapPosts = {
    posts: '/posts',
    post: '/posts/:id',
    user: {
      post: '/user/:userid/post/:postid',
      posts: '/user/:userid/posts',
    },
  };

  const routesMapPizzas = {
    pizzas: '/pizzas',
    pizza: '/pizzas/:id',
    user: {
      pizza: '/user/:userid/pizza/:pizzaid',
      pizzas: '/user/:userid/pizzas',
    },
  };

  it('should throw if the user tries to define a route already defined', () => {
    const erroneousCall = () => defineRoutes(routesMapPosts, { posts: '/hamburgers' });
    expect(erroneousCall).toThrowError(/Route with name/);
  });

  it('should throw if the user tries to define a route already defined', () => {
    const erroneousCall = () => defineRoutes(routesMapPosts, { posts: 5 });
    expect(erroneousCall).toThrowError(/Invalid argument type/);
  });

  it('should get the route from the routes map', () => {
    expect(defineRoutes(routesMapPosts, routesMapPizzas)).toEqual({
      pizzas: '/pizzas',
      pizza: '/pizzas/:id',
      posts: '/posts',
      post: '/posts/:id',
      user: {
        pizza: '/user/:userid/pizza/:pizzaid',
        pizzas: '/user/:userid/pizzas',
        post: '/user/:userid/post/:postid',
        posts: '/user/:userid/posts',
      },
    });
  });
});
