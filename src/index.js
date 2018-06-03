import EasyRoutes from './easyroutes';

export default EasyRoutes;

window.easy = new EasyRoutes();
easy({
  consultant: '/consultant/:id',
  projects: { startProject: '/start/project/:id' },
});
