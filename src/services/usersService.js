module.exports = ({ users, getKeys }) => {
  const getUser = async (email) => {
    const user = users.filter((us) => us.getEmail() === email);

    if (user && user.length === 1) {
      return user[0];
    }

    return null;
  };

  const generateKeys = async (email) => {
    const keys = await getKeys.getBothKeys();

    users.forEach((us) => {
      if (us.getEmail() === email) {
        us.setPublicKey(keys.publicKey) && us.setPrivateKey(keys.privateKey);

        return;
      }
    });

    return { privKey: keys.privateKey, pubKey: keys.publicKey };
  };

  return { getUser, generateKeys };
};
