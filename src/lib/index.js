import nxt from '$lib/images/nxt-carousel.png';
import pre from '$lib/images/pre-carousel.png';
import filterIcon from '$lib/images/filter-icon.png';

export {nxt,pre,filterIcon }
export const apiUrl = 'https://api.consumet.org';
export const proxyUrl = "https://proxy.jasanpreetn9.workers.dev/?";

const { randomBytes } = await import('node:crypto');

export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const generateUsername = (name) => {
	const id = randomBytes(2).toString('hex');
	return `${name.slice(0, 5)}${id}`;
};