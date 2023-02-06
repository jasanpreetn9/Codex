export const getProfile = async(supabase, session) => {
    const { data: userProfile, error } = await supabase
		.from('profiles')
		.select('username, avatar_url')
		.eq('id', session.user.id);

	return { userProfile, error };
};