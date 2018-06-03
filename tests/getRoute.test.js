import getRoute from '../src/getRoute';

describe('#getRoute', () => {
  const routesMap = {
    posts: '/posts',
    post: '/posts/:id',
    user: {
      post: '/user/:userid/post/:postid',
      posts: '/user/:userid/posts',
    },
  }

  it('should throw if the first argument is not an object', () => {
    const erroneousCall = () => getRoute(5, 'posts');
    expect(erroneousCall).toThrowError(/Invalid argument type/);
  });

  it('should throw if the second argument is not a string', () => {
    const erroneousCall = () => getRoute(routesMap, 5); 
    expect(erroneousCall).toThrowError(/Invalid argument type/);
  });

  it('should throw if the second argument is not a string', () => {
    const erroneousCall = () => getRoute(routesMap, 'wrong'); 
    expect(erroneousCall).toThrowError(/route wrong is undefined/);
  });

  it('should get the route from the routes map', () => {
    expect(getRoute(routesMap, 'posts')).toEqual('/posts');
    expect(getRoute(routesMap, 'post')).toEqual('/posts/:id');
    expect(getRoute(routesMap, 'user.post')).toEqual('/user/:userid/post/:postid');
    expect(getRoute(routesMap, 'user.posts')).toEqual('/user/:userid/posts');
  });
});
