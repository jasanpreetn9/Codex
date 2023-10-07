
import { AdjustmentsVertical, Eye, User, Tv } from 'svelte-hero-icons';
import logo from '$lib/images/logo.png';
export { logo };
export const apiUrl = 'https://api.consumet.org';
export const proxyUrl = 'https://proxy.jasanpreetn9.workers.dev/?';

export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const userNavigation = [
	{
		title: 'Profile',
		href: '/user/profile',
		icon: AdjustmentsVertical
	},
	{
		title: 'Account',
		href: '/user/account',
		icon: User
	},
	{
		title: 'Continue Watching',
		href: '/user/continue-watching',
		icon: Eye
	},
	{
		title: 'Lists',
		href: '/user/lists',
		icon: Tv
	}
];

export const validateData = async (formData, schema) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		console.log('Error: ', err);
		const errors = err.flatten();
		return {
			formData: body,
			errors
		};
	}
};

export const formatTime = (seconds) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const combineSubAndDub = (subArray, dubArray) => {
	return subArray.map((subEpisode) => ({
		...subEpisode,
		dub: dubArray.some((dubEpisode) => dubEpisode.number === subEpisode.number)
	}));
};