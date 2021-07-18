const { generateKeyPair } = require("crypto");

const options = {
  modulusLength: 1024 * 2,
  publicKeyEncoding: {
    type: "spki",
    cipher: "aes-256-cbc",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase: "",
  },
};

module.exports = (env) => {
  const getBothKeys = async (alg = env.keys.ALGORITHM) =>
    new Promise((resolve, reject) =>
      generateKeyPair(alg, options, async (err, pubKey, privKey) => {
        if (err) reject({ error: err });

        resolve({ publicKey: pubKey, privateKey: privKey });
      })
    );
  return { getBothKeys };
};
