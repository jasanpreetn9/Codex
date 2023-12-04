import { AdjustmentsVertical, Eye, User, Tv } from 'svelte-hero-icons';
import logo from '$lib/images/logo.png';
export { logo };
export const proxyUrl = 'https://proxy.jasanpreetn9.workers.dev/?';
export const apiUrl = "https://anime-api-tau.vercel.app"
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

export const formatTime = (seconds, ISO_8601) => {
	if (seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	} else if (ISO_8601) {
		const date = new Date(ISO_8601);

		const month = date.toLocaleString('en-US', { month: 'long' });
		const day = date.getDate();
		const year = date.getFullYear();
		return `${month} ${day}, ${year}`;
	}
};

export const combineSubAndDub = (subArray, dubArray) => {
	return subArray.map((subEpisode) => ({
		...subEpisode,
		dub: dubArray.some((dubEpisode) => dubEpisode.number === subEpisode.number)
	}));
};
