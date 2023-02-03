import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.session == null) {
		throw redirect(403, '/');
	}
	const { data: { user } } = await locals.sb.auth.getUser()
	const { data: userProfile, error } = await locals.sb
		.from('profiles')
		.select('username, avatar_url')
		.eq('id', locals.session.user.id);

    if(userProfile[0].username == null) {
		const updates = {
			id: locals.session.user.id,
			username: user.email.split('@')[0]
		};
		let { error } = await locals.sb.from('profiles').upsert(updates);
	}

	return{
		email: user.email,
		username: userProfile[0].username,
		avatar: userProfile[0].avatar_url,
		dateJoined: user.created_at
	}
};

export const actions = {
	updateAccount: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			const updates = {
				id: locals.session.user.id,
				username: body.username,
				updated_at: new Date()
			};

			let { error } = await locals.sb.from('profiles').upsert(updates);

			if (error) throw error;
		} catch (error) {
			if (error) {
				console.log(error.message);
			}
		}
		throw redirect(202, '/');
	}
};
