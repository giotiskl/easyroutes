# easyroutes
 [![Build Status](https://travis-ci.org/giotiskl/easyroutes.svg?branch=master)](https://travis-ci.org/giotiskl/easyroutes)

## Description
**easyroutes** is an easy, uncomplicated package that helps you maintain named routes and construct them with parameters, a search string and/or a hash with a straightfoward API. 

It can be used in combination with any JavaScript router (e.g. React Router).

## Getting started
These instructions will get you read to start defining your routes.

Contents:
* [Instantiate a routes map](#instantiate-a-routes-map)
* [Defining new routes](#defining-new-routes)
* [Interpolating a route](#interpolating-a-route)
* [Adding a search string and/or a hash](#adding-a-search-string-and/or-a-hash)

### Installing
With NPM:
````npm install --save @yiotis/easyroutes````

With Yarn:
````yarn add @yiotis/easyroutes````

### Usage
#### Instantiate a routes map
Let's imagine that we need to define routes for a module named `posts`, resembling the posts of a blog.
We start by creating an easyroutes instance. Which we can then export, to reuse later.

````
import EasyRoutes from '@yiotis/easyroutes';

const postsRoutes = new EasyRoutes({
  newPost: '/post/new',
  post: '/post/:id',
});

export default postRoutes;
````

#### Defining new routes
Once you have an easyroutes instance, you can then import it from any other module and add more routes to it.
Simply invoke it providing an object of routes.
````
import postRoutes from './postRoutes';

postRoutes({
  deletedPosts: '/deleted-posts',
  user: {
    posts: '/user/:id/posts', // use :parameter to define a parameter
  },
});
````
This will merge the new routes into the router. Keep in mind that trying to overwrite an old route will result in an exception.

#### Interpolating a route
To output a route you simply need to invoke your easyroutes instance with the key to your route.
````
const deletedPostsRoute = postRoutes('deletedPosts'); // will output '/deleted-posts'
````

To interpolate a route with parameters you need to pass an object with the key as the parameter name and a value.
````
// will output '/user/xkai3jasivn/posts'
const userPostsRoute = postRoutes('user.posts', {
  id: 'xkai3jasivn',
});
````
If you don't define values for all parameters, `easyroutes` will throw an exception.

#### Adding a search string and/or a hash
Sometimes you might need a search string and/or a hash added to your route. In this case you can build a route
passing in an object of options as follows.
````
// will output '/user/xkai3jasivn/posts?q=old#heading
const userPostsRoute = postRoutes('user.posts', {
  params: {
    id: 'xkai3jasivn',
  },
  search: {
    q: 'old',
  },
  hash: '#heading',
});
````

The search could also have been a string so the previous example could be rewritten as:
````
// will output '/user/xkai3jasivn/posts?q=old#heading
const userPostsRoute = postRoutes('user.posts', {
  params: {
    id: 'xkai3jasivn',
  },
  search: '?q=old',
  hash: '#heading',
});
````

## Versioning
[SemVer](https://semver.org/) is used for the versioning of this project.

## License
Project is licensed under MIT. Check the License file for more.