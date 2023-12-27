/** @type {import('./$types').RequestHandler} */

export const POST = async ({ locals, url, request }) => {
	const data = await request.json();
	const { currentTime, duration, idMal, continueWatching, currentEp, episodeId } = data;
	try {
		const record = await locals.pb.collection('continue_watching').update(continueWatching.id, {
			number: currentEp.number,
			title: currentEp.title,
			image: currentEp.image,
			hasDub: currentEp.hasDub,
			currentTime: currentTime,
			episodeId: episodeId,
			duration: duration
		});
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
	return new Response(
		JSON.stringify({
			success: true
		}),
		{
			status: 200
		}
	);
};
