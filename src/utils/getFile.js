const http = require("http");

module.exports = (env) => {
  const fromUrl = async (url = env.encryption.SAMPLE_FILE) => {
    const file = await new Promise((resolve, reject) =>
      http.get(url, (res) => {
        const data = [];
        res
          .on("data", (chunk) => data.push(chunk))
          .on("end", () => {
            const buffer = Buffer.concat(data);

            resolve(buffer);
          })
          .on("error", (err) => reject(err));
      })
    );

    return file;
  };

  return { fromUrl };
};
