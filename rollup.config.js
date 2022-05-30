import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import {routify} from '@sveltech/routify';
import cleaner from 'rollup-plugin-cleaner';
import postcss from 'rollup-plugin-postcss';
import sveltePreprocess from 'svelte-preprocess';
import del from 'rollup-plugin-delete'
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		name: 'app',
		format: 'esm',
		dir: 'public/build/'
	},
	plugins: [
		del({targets: 'public/build/**'}),
		svelte({
			compilerOptions: {
				dev: !production,
			},
			preprocess: sveltePreprocess({
				sourceMap: true,
				postcss: {
					plugins: [require('tailwindcss')(), require('autoprefixer')()]
				}
			})
		}),
		postcss(
			{
				extract: "bundle.css"
			}
		),
		routify({
			dynamicImports : true,
			routifyDir: ".routify",
		}),
		cleaner({
			targets: [
				'public/build/'
			]
		}),
		css({
			output: 'bundle.css',
			sourceMap: false
		}),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
