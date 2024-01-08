import { AdjustmentsVertical, Eye, User, Tv } from 'svelte-hero-icons';
import { stripHtml } from 'string-strip-html';
import logo from '$lib/images/logo.png';
export { logo };
export const proxyUrl = 'https://proxy.jasanpreetn9.workers.dev/?';
export const apiUrl = 'https://anime-api-tau.vercel.app';
export const anilistUrl = 'https://graphql.anilist.co/';

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

export const formatDetails = (media) => {
	const relations = media?.relations?.edges
		?.map((relation) => {
			return {
				relationType: relation?.relationType,
				...relation?.node
			};
		})
		.filter(
			(relation) =>
				(relation?.relationType == 'PREQUEL' || relation?.relationType == 'SEQUEL') &&
				relation.format != null
		);
	// Format studios
	const studios = media?.studios?.edges?.map((studio) => studio.node.name).join(', ');

	// Format airing date
	if (media?.nextAiringEpisode) {
		const airingDate = new Date(media.nextAiringEpisode.airingAt * 1000);
		media.nextAiringEpisode.airingAt = airingDate.toDateString();
	}

	// Format date fields
	const formatDate = (date) => {
		const formattedDate = new Date(date.year, date.month - 1, date.day);
		return formattedDate.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	};

	media.startDate = formatDate(media?.startDate);
	media.endDate = formatDate(media?.endDate);

	// Remove HTML tags and trim description
	media.description = stripHtml(media?.description).result.split('*')[0];

	// Extract and format recommendations
	const recommendations = media?.recommendations?.edges
		?.map((recommendation) => recommendation.node.mediaRecommendation)
		.filter((recommendation) => recommendation?.format.toLowerCase() !== 'manga');

	// Update the media object with the formatted data
	media.relations = relations;
	media.studios = studios;
	media.genres = media?.genres?.join(', ');
	media.recommendations = recommendations;
	return media;
};

export const watchListQuery = `
query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
	  idMal
      title {
        english
        native
      }
      coverImage {
        extraLarge
      }
      format
      genres
    }
  }`;

export const detailsQuery = `
query ($id: Int) {
  Media(idMal: $id, format_not: MANGA) {
    id
    idMal
    title {
      english
      native
    }
    coverImage {
      extraLarge
    }
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    bannerImage
    seasonYear
    description(asHtml: false)
    format
    status(version: 2)
    genres
    meanScore
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    recommendations {
      edges {
        node {
          mediaRecommendation {
            id
            idMal
            title {
              romaji
              english
            }
            coverImage {
              extraLarge
            }
            genres
            format
          }
        }
      }
    }
    relations {
      edges {
        relationType
        node {
          idMal
          bannerImage
          coverImage {
            extraLarge
          }
          format
          type
          title {
            romaji
            english
          }
          startDate {
            year
            month
            day
          }
        }
      }
    }
    studios(isMain: true) {
      edges {
        node {
          name
        }
      }
    }
  }
}

`;
