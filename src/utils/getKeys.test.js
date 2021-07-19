const env = require("../env/env");
const getKeys = require("./getKeys")(env);

const { getBothKeys } = getKeys;

test("generate keys using env default", async () => {
  expect.assertions(3);
  const keys = await getBothKeys();

  expect(typeof keys === "object").toBeTruthy();
  expect(keys.privateKey).toContain("-----BEGIN ENCRYPTED PRIVATE KEY-----");
  expect(keys.publicKey).toContain("-----BEGIN PUBLIC KEY-----");
});

test("generate keys using 'rsa'", async () => {
  expect.assertions(3);
  const keys = await getBothKeys("rsa");

  expect(typeof keys === "object").toBeTruthy();
  expect(keys.privateKey).toContain("-----BEGIN ENCRYPTED PRIVATE KEY-----");
  expect(keys.publicKey).toContain("-----BEGIN PUBLIC KEY-----");
});
