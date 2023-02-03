export const load = async ({locals}) => {
	if(locals.session == null){
		throw redirect(403, '/')
	}
}

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
	}
};
