const express = require("express");
const http = require("http");
const env = require("./env/env");

// MOCKUP DATA
const mockup = require("./mockup-data");

// SERVER
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerFactory = require("./utils/routerFactory")();
const userFactory = require("./models/user")();

const users = mockup.users.map((u) => userFactory.create(u));

// UTILS
const getKeys = require("./utils/getKeys")(env);
const getFile = require("./utils/getFile")(env);

// SERVICES
const usersService = require("./services/usersService")({ users, getKeys });
const authService = require("./services/authService")({
  app,
  env,
  usersService,
});
const encryptionService = require("./services/encryptionService")({
  env,
  getFile,
});

// ROUTES
app.use(
  "/api",
  require("./routes/api")({
    routerFactory,
    authService,
    encryptionService,
    usersService,
  })
);

server.listen(env.server.PORT, (err) => {
  console.info(`Server has started on port ${env.server.PORT}`);

  if (err) {
    console.error(err);
  }
});
