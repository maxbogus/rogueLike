import esbuild from 'esbuild';
import {copyFile} from 'fs/promises';

await esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outdir: 'dist',
});

await copyFile('static/index.html', 'dist/index.html');
