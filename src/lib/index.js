import nxt from '$lib/images/nxt-carousel.png';
import pre from '$lib/images/pre-carousel.png';

export {nxt,pre }
export const apiUrl = 'https://api.consumet.org';

export const getContinueWatching = () => {
		if (!import.meta.env.SSR) {
			// get local storage
			let object = localStorage.getItem('continueWatching');

			if (object) {
				let parsedData = JSON.parse(object);
				return parsedData;
			}
		}
};


