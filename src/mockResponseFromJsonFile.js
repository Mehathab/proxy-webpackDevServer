const fs = require("fs");

const mockResponseFromJsonFile = (fileName) => (req, res) => {
  const fileContent = JSON.parse(
    fs.readFileSync(`${process.cwd()}/mocks/${fileName}.json`, "utf-8")
  );
  const jsonContent = JSON.stringify(fileContent, null, 3);
  res.setHeader("Cache-control", "no-store");
  res.status(200).send(jsonContent);
};
module.exports = mockResponseFromJsonFile;
