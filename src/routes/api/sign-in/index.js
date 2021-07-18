module.exports = ({ routerFactory, authService }) => {
  const router = routerFactory.create();

  require("./post")({ router, authService });
  // require("./get")({ router, authService }); // DEBUG

  return router;
};
