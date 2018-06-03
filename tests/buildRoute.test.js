import { buildRoute, buildRouteWithOptions } from '../src/buildRoute';

describe('#buildRoute', () => {
  const routesMap = {
    posts: '/posts',
    post: '/posts/:id',
    user: {
      post: '/user/:userid/post/:postid',
      posts: '/user/:userid/posts',
    },
  };

  it('should throw if the first argument is not an object', () => {
    const erroneousCall = () => buildRoute(5, 'posts');
    expect(erroneousCall).toThrowError(/Invalid argument type/);
  });

  it('should throw if the second argument is not a string', () => {
    const erroneousCall = () => buildRoute(routesMap, 5);
    expect(erroneousCall).toThrowError(/Invalid argument type/);
  });

  it('should throw if the third argument is not an object', () => {
    const erroneousCall = () => buildRoute(routesMap, 'posts', 5);
    expect(erroneousCall).toThrowError(/Invalid argument type/);
  });

  it('should throw if there is a parameter that was not replaced with a value in the final output', () => {
    const erroneousCall = () => buildRoute(routesMap, 'post', {});
    expect(erroneousCall).toThrowError(/Invalid output/);
  });

  it('should interpolate the value of the route when all parameters are passed', () => {
    expect(buildRoute(routesMap, 'post', { id: 'dskao0923x' })).toEqual('/posts/dskao0923x');
  });
});

describe('#buildRouteWithOptions', () => {
  const routesMap = {
    posts: '/posts',
    post: '/posts/:id',
    user: {
      post: '/user/:userid/post/:postid',
      posts: '/user/:userid/posts',
    },
  };

  it('should throw if the first argument is not an object', () => {
    const erroneousCall = () => buildRouteWithOptions(5, 'posts');
    expect(erroneousCall).toThrowError(/Invalid argument type/);
  });

  it('should throw if the second argument is not a string', () => {
    const erroneousCall = () => buildRouteWithOptions(routesMap, 5);
    expect(erroneousCall).toThrowError(/Invalid argument type/);
  });

  it('should throw if the third argument is not an object', () => {
    const erroneousCall = () => buildRouteWithOptions(routesMap, 'posts', 5);
    expect(erroneousCall).toThrowError(/Invalid argument type/);
  });

  it('should throw if there is a parameter that was not replaced with a value in the final output', () => {
    const erroneousCall = () => buildRouteWithOptions(routesMap, 'post', {});
    expect(erroneousCall).toThrowError(/Invalid output/);
  });

  it('should interpolate the value of the route when all parameters are passed', () => {
    const params = { id: 'dskao0923x' };
    expect(buildRouteWithOptions(routesMap, 'post', { params })).toEqual('/posts/dskao0923x');
  });

  it('should append a search string to the interpolated route when defined in the options', () => {
    const params = { id: 'dskao0923x' };
    const searchStringObject = { firstparam: 'first', secondparam: 'second' };
    const searchString = '?firstparam=first&secondparam=second';
    expect(buildRouteWithOptions(routesMap, 'post', { params, search: searchStringObject })).toEqual(
      '/posts/dskao0923x?firstparam=first&secondparam=second',
    );
    expect(buildRouteWithOptions(routesMap, 'post', { params, search: searchString })).toEqual(
      '/posts/dskao0923x?firstparam=first&secondparam=second',
    );
  });

  it('should append a hash to the interpolated route when a hash is defined in the options', () => {
    const params = { id: 'dskao0923x' };
    const hash = '#a-long-hash';
    expect(buildRouteWithOptions(routesMap, 'post', { params, hash })).toEqual('/posts/dskao0923x#a-long-hash');
  });

  it('should append a search string and a hash when both are defined', () => {
    const params = { id: 'dskao0923x' };
    const search = '?firstparam=first&secondparam=second';
    const hash = '#a-long-hash';
    expect(buildRouteWithOptions(routesMap, 'post', { params, search, hash })).toEqual(
      '/posts/dskao0923x?firstparam=first&secondparam=second#a-long-hash',
    );
  });
});
