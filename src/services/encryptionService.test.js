const env = require("../env/env");
const encryptionService = require("./encryptionService")({ env });

testPublicKey =
  "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsxtNH/20kAlXctqGXYqw\nZSqT/YMxFOwGCDwOiKBCCD7MSGv0gTKC4IP3MG+STMsn+ToTWUiCpf/nkzZ1ZQAQ\nBsdRsCJviy2qTGyjnkNhZ227JEyFIL9f6AQNNXuRzM9bthsClXQbA/bHw4M68LYz\n+4yZcAazCWpSYgrS3J4uiywsZsw3H8U8Td46OlVxQc6ior9GxnT3F3n1wfWSsX5K\nSp9t4oySUow6gMmj6T/ccqlTz23BNKkeCj6BGvDnbv0YWd32HFJm7qGc846dEREn\nAikPm1Iy5mAB1EZrwoqsaSeXUXJBkvSPCNfwn3dS42+tfZEoQfCxmJmBnH5WVkm9\nRwIDAQAB\n-----END PUBLIC KEY-----\n";

const { encodeAes, encode } = encryptionService;

test("check 'encodeAes' function: check if proper output is generated", async () => {
  expect.assertions(3);

  const response = await encodeAes("test message");

  expect(response && typeof response === "object").toBeTruthy();
  expect(
    response.encryptedFile &&
      response.encryptedFile instanceof Buffer &&
      response.encryptedFile.byteLength > 10
  ).toBeTruthy();
  expect(
    response.key &&
      response.key instanceof Buffer &&
      response.key.byteLength > 10
  ).toBeTruthy();
});

test("check 'encode' function: check if proper output is generated", async () => {
  expect.assertions(3);

  const response = await encode("test message", testPublicKey);

  expect(response && typeof response === "object").toBeTruthy();
  expect(
    response.encryptedFile &&
      response.encryptedFile instanceof Buffer &&
      response.encryptedFile.byteLength > 10
  ).toBeTruthy();
  expect(
    response.encryptedKey &&
      response.encryptedKey instanceof Buffer &&
      response.encryptedKey.byteLength > 10
  ).toBeTruthy();
});
