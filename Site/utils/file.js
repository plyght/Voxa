import fs from 'fs';
import path from 'path';

export const writeFile = async (pathName, data) => {
  const dataToWrite = JSON.stringify(data);

  await fs.mkdir(
    path.dirname(pathName),
    { recursive: true },
    async function (err) {
      await fs.writeFile(pathName, dataToWrite, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  );
};

export const fileExists = (pathName) => {
  return fs.existsSync(pathName);
};

export const readFile = async (pathName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathName, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(data));
    });
  });
};
