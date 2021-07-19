const crypto = require("crypto");

module.exports = ({ env, getFile }) => {
  const encodeAes = async (data) => {
    const key = crypto.randomBytes(256 / 8);
    const iv = Buffer.from(
      Array.prototype.map.call(Buffer.alloc(16), () => {
        return Math.floor(Math.random() * 256);
      })
    );
    const aes = crypto.createCipheriv(env.encryption.AES_ALGORITHM, key, iv);
    const encryptedBuffer = aes.update(data);
    aes.final();

    return { encryptedFile: encryptedBuffer, key };
  };
  const encode = async (data, pubKey) => {
    const { encryptedFile, key } = await encodeAes(data);

    const encryptedKey = crypto.publicEncrypt(pubKey, key);

    return { encryptedFile, encryptedKey };
  };

  const getAndEncode = async ({ url, publicKey }) => {
    const file = await getFile.fromUrl(url);
    const { encryptedFile, encryptedKey } = await encode(file, publicKey);

    const base64File = Buffer.from(encryptedFile).toString("base64");

    const base64Key = Buffer.from(encryptedKey).toString("base64");

    return { base64EncryptedFile: base64File, base64EncryptedKey: base64Key };
  };

  return { encodeAes, encode, getAndEncode };
};
