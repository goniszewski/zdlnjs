module.exports = {
  server: {
    PORT: 5000,
  },
  token: {
    ACCESS_TOKEN_SECRET: "s65r87g6s2e",
    EXPIRES_IN: "5m",
  },
  responses: {
    USER_DONT_EXISTS: { message: "User doesn't exist.", code: 401 },
    WRONG_CREDENTIALS: { message: "Wrong login and/or password.", code: 401 },
  },
  keys: {
    ALGORITHM: "rsa",
  },
  encryption: {
    SAMPLE_FILE: "http://www.africau.edu/images/default/sample.pdf",
    AES_ALGORITHM: "aes-256-ctr",
  },
};
