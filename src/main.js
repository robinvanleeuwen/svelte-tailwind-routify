import HMR from  '@sveltech/routify/hmr'
import App from './App.svelte';

const app = HMR(App, { target: document.body }, 'my-svelte-project')

export default app;
