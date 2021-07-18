const express = require("express");

const routerFactory = () => {
  const create = () => express.Router({ mergeParams: true });

  return {
    create,
  };
};

module.exports = routerFactory;
