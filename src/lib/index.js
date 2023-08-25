import nxt from '$lib/images/nxt-carousel.png';
import pre from '$lib/images/pre-carousel.png';

export {nxt,pre }
export const apiUrl = 'https://api.consumet.org';

export const artPlayerSettings = (artplayer_settings) => {
	let transformedArray = []; // Initialize transformedArray

		// Only use localStorage in the browser environment

		// Parse the JSON data from localStorage
			let parsedData = artplayer_settings;

			// Transform the nested object into an array of objects
			if (parsedData && parsedData.times) {
				transformedArray = Object.entries(parsedData.times).map(([key, time]) => {
					const [id, ep] = key.split('-');
					return {
						id: parseInt(id),
						time: time,
						ep: parseInt(ep)
					};
				});
			}
		
	
	// Filter the array to keep only the highest ep values for each id
	let filteredArray = [];
	const idToMaxEp = {}; // Lookup object for max ep values

	transformedArray.forEach((item) => {
		const { id, ep } = item;
		if (!idToMaxEp[id] || ep > idToMaxEp[id]) {
			idToMaxEp[id] = ep;
		}
	});

	filteredArray = transformedArray.filter((item) => {
		const { id, ep } = item;
		return ep === idToMaxEp[id];
	});
	
return filteredArray
};


