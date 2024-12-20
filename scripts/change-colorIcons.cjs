const fs = require("fs");
const { join } = require("node:path");
const fsp = fs.promises;

const dirWithIcons = "src/assets/icons/components";
const main = async () => {
  const files = await fsp.readdir(dirWithIcons);
  files.forEach(async (file) => {
    const filePath = join(dirWithIcons, file);
    const fileContent = await fsp.readFile(filePath, "utf-8");
    const newFileContent = fileContent.replaceAll("#fff", "currentColor").replaceAll("#000", "currentColor");
    fsp.writeFile(filePath, newFileContent);
  });
};

void main();