export async function load({ fetch, params }) {
    const resp = await fetch(`https://consumet-ten.vercel.app/meta/anilist/info/${params.id}`);
	const respData = await resp.json(resp);
	return {
        respData
    };
}
