const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  server: {
    PORT: process.env.SERVER_PORT || 5000,
  },
  token: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "testTest",
    EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || "5m",
  },
  responses: {
    USER_DOESNT_EXISTS: { message: "User doesn't exist.", code: 400 },
    WRONG_CREDENTIALS: { message: "Wrong login and/or password.", code: 400 },
  },
  keys: {
    ALGORITHM: process.env.KEYS_ALGORITHM || "rsa",
  },
  encryption: {
    SAMPLE_FILE:
      process.env.SAMPLE_FILE ||
      "http://www.africau.edu/images/default/sample.pdf",
    AES_ALGORITHM: process.env.ENCRYPTION_ALGORITHM || "aes-256-ctr",
  },
};
