const env = require("../env/env");
const getFile = require("./getFile")(env);

const customUrl =
  "http://www.google.com/images/branding/googlelogo/1x/googlelogo_color_150x54dp.png";

const { fromUrl } = getFile;

test("get file using env default", async () => {
  const file = await fromUrl();

  expect(file instanceof Buffer && file.byteLength > 5).toBeTruthy();
});

test("get custom file", async () => {
  const file = await fromUrl(customUrl);

  expect(file instanceof Buffer && file.byteLength > 10).toBeTruthy();
});
