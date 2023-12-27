/** @type {import('./$types').RequestHandler} */

export const POST = async ({ locals, url, request }) => {
	const data = await request.json();
	const { duration, idMal, currentEp, episodeId } = data;
    const userId = locals.pb.authStore.baseModel.id;

	try {
		const record = await locals.pb.collection('continue_watching').create({
            idMal,
			user: userId,
            number: currentEp.number,
			title: currentEp.title,
			image: currentEp.image,
			hasDub: currentEp.hasDub,
			currentTime: 0,
			episodeId: episodeId,
			duration: duration
		});
        return new Response(
            JSON.stringify({
                success: true,
                record
            }),
            {
                status: 200
            }
        );
	} catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                ...error
            }),
            {
                status: error.status
            }
        );
	}
};
