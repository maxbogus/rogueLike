import esbuild from 'esbuild';
import {copyFile} from 'fs/promises';

const context = await esbuild.context({
  entryPoints: ['src/index.tsx'],
  outdir: 'dist',
  bundle: true
})

const {host, port} = await context.serve({
  servedir: 'dist'
})

console.log(`serving app on http://${host}:${port}/`);
await copyFile('static/index.html', 'dist/index.html');

