import esbuild from 'esbuild';
import {copyStatic} from './utils.js';

const context = await esbuild.context({
  entryPoints: ['src/index.tsx'],
  outdir: 'dist',
  bundle: true
});

await context.watch();

await copyStatic();

const {host, port} = await context.serve({
  servedir: 'dist'
})

console.log(`Serving app on http://${host}:${port}/`);
