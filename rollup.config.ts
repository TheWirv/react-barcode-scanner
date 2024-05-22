import type {RollupOptions, InputPluginOption, OutputOptions} from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sucrase from '@rollup/plugin-sucrase';
import buble from '@rollup/plugin-buble';
import terser from '@rollup/plugin-terser';
import cjsCheck from 'rollup-plugin-cjs-check';
import dts from 'rollup-plugin-dts';

const commonPlugins: InputPluginOption = [
  resolve({
    extensions: ['.mjs', '.js', '.ts'],
    mainFields: ['module', 'jsnext', 'main'],
    preferBuiltins: false,
    browser: true,
  }),

  commonjs({
    ignoreGlobal: true,
    include: /\/node_modules\//,
    extensions: ['.mjs', '.js', '.ts'],
  }),

  sucrase({
    exclude: ['node_modules/**'],
    transforms: ['typescript', 'jsx'],
  }),
];

const jsPlugins = (isMinified?: boolean): InputPluginOption => [
  ...commonPlugins,
  cjsCheck(),

  buble({
    transforms: {
      asyncAwait: false,
      stickyRegExp: false,
      unicodeRegExp: false,
      defaultParameter: false,
      dangerousForOf: true,
      dangerousTaggedTemplateString: true,
      destructuring: false,
      arrow: false,
      classes: false,
      computedProperty: false,
      conciseMethodProperty: false,
      templateString: false,
      parameterDestructuring: false,
      spreadRest: false,
    },
    exclude: 'node_modules/**',
    objectAssign: 'Object.assign',
  }),

  terser({
    ecma: 2015,
    keep_fnames: true,
    ie8: false,
    compress: {
      pure_getters: true,
      toplevel: true,
      booleans_as_integers: false,
      keep_fnames: true,
      keep_fargs: true,
      if_return: false,
      ie8: false,
      sequences: false,
      loops: false,
      conditionals: false,
      join_vars: false,
    },
    mangle: {
      module: true,
      keep_fnames: true,
    },
    output: !isMinified
      ? {
          beautify: true,
          braces: true,
          indent_level: 2,
        }
      : undefined,
  }),
];

const output = (format: 'esm' | 'cjs', isMinified?: boolean): OutputOptions => {
  let extension = format === 'esm' ? '.mjs' : '.js';

  if (isMinified) {
    extension = '.min' + extension;
  }

  return {
    chunkFileNames: '[hash]' + extension,
    entryFileNames: '[name]' + extension,
    dir: './dist',
    exports: 'named',
    sourcemap: true,
    sourcemapExcludeSources: false,
    indent: false,
    freeze: false,
    strict: false,
    format,
    // NOTE: All below settings are important for cjs-module-lexer to detect the export
    // When this changes (and terser mangles the output) this will interfere with Node.js ESM intercompatibility
    esModule: format !== 'esm',
    externalLiveBindings: format !== 'esm',
    generatedCode: {
      preset: 'es5',
      reservedNamesAsProps: false,
      objectShorthand: false,
      constBindings: false,
    },
  };
};

const commonConfig = {
  input: {
    main: './src/index.ts',
  },
  onwarn: () => {},
  external: () => false,
  treeshake: {
    unknownGlobalSideEffects: false,
    tryCatchDeoptimization: false,
    moduleSideEffects: false,
  },
};

const jsConfig: RollupOptions = {
  ...commonConfig,
  plugins: jsPlugins(),
  output: [output('esm'), output('cjs')],
};

const jsMinConfig: RollupOptions = {
  ...commonConfig,
  plugins: jsPlugins(true),
  output: [output('esm', true), output('cjs', true)],
};

const dtsConfig: RollupOptions = {
  ...commonConfig,
  plugins: [...commonPlugins, dts()],
  output: {
    dir: './dist',
    entryFileNames: '[name].d.ts',
    format: 'esm',
  } as OutputOptions,
};

export default [jsConfig, jsMinConfig, dtsConfig];
