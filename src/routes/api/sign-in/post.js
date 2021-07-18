module.exports = ({ router, authService }) => {
  router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400);

    const { token, message, code } = await authService.loginUser(
      email,
      password
    );

    if (!token) return res.status(code).send(message);

    return res.status(200).json({ authToken: token });
  });
};
