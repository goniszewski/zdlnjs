module.exports = ({ router, usersService }) => {
  router.get("/", async (req, res) => {
    const { email } = req.user;

    const keys = await usersService.generateKeys(email);

    if (!keys)
      return res
        .status(500)
        .send("Error occurred during generation of RSA key pair.");

    return res.status(201).json({ ...keys });
  });
};
