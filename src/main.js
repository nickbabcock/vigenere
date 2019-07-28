import App from './App.svelte';
import { encrypt, decrypt, recoverVigenere } from './core/vigenere-cipher';

const app = new App({
	target: document.body,
	props: {
		name: recoverVigenere(decrypt(encrypt('hello world', 'abc'), 'abc'), 10).plainText
	}
});

export default app;
