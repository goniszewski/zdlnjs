module.exports = ({ router, usersService, encryptionService }) => {
  router.get("/", async (req, res) => {
    const { email } = req.user;
    const { url } = req.query;

    if (url && !url.includes("http://"))
      return res.status(400).send("Use url with 'http://' at the beginning.");

    const user = await usersService.getUser(email);

    const publicKey = user.getPublicKey();

    if (!publicKey)
      return res
        .status(400)
        .send("Use [GET]'/generate-key-pair' endpoint first.");

    const payload = await encryptionService.getAndEncode({ publicKey, url });

    return res.status(200).json({ ...payload });
  });
};
