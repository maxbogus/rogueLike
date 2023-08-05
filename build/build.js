import esbuild from 'esbuild';
import {copyStatic} from './utils.js';

await esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outdir: 'dist',
});

await copyStatic();
