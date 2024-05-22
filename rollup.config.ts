import type { RollupOptions } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from '@chrisneedham/rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import packageJson from './package.json' assert {type: 'json'};

const config: RollupOptions[] = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'commonjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'module',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve({ extensions: ['.ts', '.tsx'] }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        module: 'esnext',
        include: ['src/**/*'],
      }),
      terser(),
    ],
  },
  {
    input: 'lib/module/index.d.ts',
    output: [
      {
        file: 'lib/commonjs/index.d.ts',
        format: 'esm',
        chunkFileNames: '[name].js',
      },
      {
        file: 'lib/module/index.d.ts',
        format: 'esm',
        chunkFileNames: '[name].js',
      },
    ],
    plugins: [dts()],
  },
];

export default config;
