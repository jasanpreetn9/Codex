export async function load({ fetch, params,url }) {
    let epId = url.searchParams.get('epId');
    console.log(epId);
    console.log(params.id)
	const respWatch = await fetch(`https://api.consumet.org/meta/anilist/watch/${epId}`);
	const respDataWatch = await respWatch.json(respWatch);
    const respInfo = await fetch(`https://api.consumet.org/meta/anilist/info/${params.id}`);
	const respDataInfo = await respInfo.json(respInfo);
    console.log(respDataWatch)
	return {
        respDataInfo,
        respDataWatch
    };
}
