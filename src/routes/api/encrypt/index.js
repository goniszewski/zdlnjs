module.exports = ({ routerFactory, usersService, encryptionService }) => {
  const router = routerFactory.create();

  require("./get")({ router, usersService, encryptionService });

  return router;
};
