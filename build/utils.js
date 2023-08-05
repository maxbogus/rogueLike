import {copyFile} from 'fs/promises';

const files = ['index.html', 'icon.svg'];

export const copyStatic = () => {
  files.forEach(async (file) => {
    await copyFile(`static/${file}`, `dist/${file}`);
  })
}
