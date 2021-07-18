module.exports = ({ routerFactory, usersService }) => {
  const router = routerFactory.create();

  require("./get")({ router, usersService });

  return router;
};
