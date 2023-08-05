import esbuild from 'esbuild';
import {copyFile} from 'fs/promises';

await esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outdir: 'dist',
});

const files = ['index.html', 'icon.svg'];

files.forEach(async (file) => {
    await copyFile(`static/${file}`, `dist/${file}`);
  })

