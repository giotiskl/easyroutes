import EasyRoutes from '../src/easyroutes';

describe('#EasyRoutes', () => {
  const easy = new EasyRoutes({
    posts: '/posts',
    post: '/posts/:id',
    user: {
      post: '/user/:userid/post/:postid',
      posts: '/user/:userid/posts',
    },
  });

  describe('#constructor', () => {
    it('should create a new easyroutes instance with routes optionally defined', () => {
      expect(
        new EasyRoutes({
          posts: '/posts',
          post: '/posts/:id',
          user: {
            post: '/user/:userid/post/:postid',
            posts: '/user/:userid/posts',
          },
        })(),
      ).toEqual({
        posts: '/posts',
        post: '/posts/:id',
        user: {
          post: '/user/:userid/post/:postid',
          posts: '/user/:userid/posts',
        },
      });
    });
  });

  describe('#extend routes', () => {
    it('should add new routes in the routes map', () => {
      easy({ donut: '/donuts/:id' });
      expect(easy()).toEqual({
        donut: '/donuts/:id',
        posts: '/posts',
        post: '/posts/:id',
        user: {
          post: '/user/:userid/post/:postid',
          posts: '/user/:userid/posts',
        },
      });
    });
  });

  describe('#get route name raw', () => {
    it('should interpolate the raw route given the path', () => {
      expect(easy('user.post')).toEqual('/user/:userid/post/:postid');
    });
  });

  describe('#get route name with params replaced', () => {
    it('should interpolate the route given the path and params', () => {
      expect(easy('user.posts', { userid: 'dksao20dsaxki' })).toEqual('/user/dksao20dsaxki/posts');
    });
  });

  describe('#get route name with params replaced and search string and/or hash', () => {
    it('should interpolate the route given the path and params and search string', () => {
      const params = { userid: 'dksao20dsaxki' };
      const search = '?q=hello';
      const options = { params, search };
      expect(easy('user.posts', options)).toEqual('/user/dksao20dsaxki/posts?q=hello');
    });

    it('should interpolate the route given the path and params and hash', () => {
      const params = { userid: 'dksao20dsaxki' };
      const hash = '#hash';
      const options = { params, hash };
      expect(easy('user.posts', options)).toEqual('/user/dksao20dsaxki/posts#hash');
    });
    
    it('should interpolate the route given the path and params and search string and hash', () => {
      const params = { userid: 'dksao20dsaxki' };
      const search = '?q=hello';
      const hash = '#hash';
      const options = { params, search, hash };
      expect(easy('user.posts', options)).toEqual('/user/dksao20dsaxki/posts?q=hello#hash');
    });
  });
});
