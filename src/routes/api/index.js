module.exports = ({
  routerFactory,
  authService,
  encryptionService,
  usersService,
}) => {
  const router = routerFactory.create();

  router.use("/sign-in", require("./sign-in")({ routerFactory, authService }));
  router.use(
    "/generate-key-pair",
    authService.authenticate,
    require("./generate-key-pair")({ routerFactory, usersService })
  );
  router.use(
    "/encrypt",
    authService.authenticate,
    require("./encrypt")({ routerFactory, encryptionService, usersService })
  );

  return router;
};
