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
		title: 'Continue Watching',
		href: '/user/continue-watching',
		icon: User
	},
	{
		title: 'Watch List',
		href: '/user/watch-list',
		icon: Eye
	},
	{
		title: 'Notification',
		href: '/user/notification',
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

