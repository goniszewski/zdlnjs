module.exports = ({ router, authService }) => {
  router.get("/", async (req, res) => {
    const bcrypt = require("bcrypt");
    const salt = bcrypt.genSaltSync(6);
    const hash = async (pass) => bcrypt.hashSync(pass, salt);

    const test1 = await hash("test1");
    const test2 = await hash("test2");

    return res.json({
      test1,
      test2,
    });
  });
};
