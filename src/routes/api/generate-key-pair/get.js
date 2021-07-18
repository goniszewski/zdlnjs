module.exports = ({ router, usersService }) => {
  router.get("/", async (req, res) => {
    const { email } = req.user;

    const keys = await usersService.generateKeys(email);

    return res.json({ ...keys });
  });
};
