const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const env = require("../env/env");
const authService = require("./authService")({ env, app });

const { passMatch, generateToken } = authService;

test("check 'passMatch' function: check if it match", async () => {
  const response = await passMatch(
    "test1",
    "$2b$06$Bq8NXWbeJ9Fuddv7HMezFOPnb3z/aVEApF4PymRnwz7AxmzS1UFQK"
  );

  expect(response).toBeTruthy();
});

test("check 'generateToken' function: check if output is generated & verify JWT token", async () => {
  expect.assertions(2);

  const response = generateToken("jane@doe.com", "1h");
  const verified = jwt.verify(response, env.token.ACCESS_TOKEN_SECRET);

  expect(typeof response === "string" && response.length > 10).toBeTruthy();
  expect(verified).toBeTruthy();
});
