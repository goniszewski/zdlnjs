class User {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
    this.publicKey = data.publicKey;
    this.privateKey = data.privateKey;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getPublicKey() {
    return this.publicKey;
  }

  getPrivateKey() {
    return this.privateKey;
  }

  setPublicKey(key) {
    this.publicKey = key;

    return true;
  }

  setPrivateKey(key) {
    this.privateKey = key;

    return true;
  }
}

const userFactory = () => {
  const create = (data) => {
    return new User(data);
  };

  return { create };
};

module.exports = userFactory;
