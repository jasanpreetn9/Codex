import nxt from '$lib/images/nxt-carousel.png';
import pre from '$lib/images/pre-carousel.png';
import filterIcon from '$lib/images/filter-icon.png';

export { nxt, pre, filterIcon };

export const apiUrl = 'https://api.consumet.org';

export const serializeNonPOJOs = (obj) => {
  return structuredClone(obj);
};

export const generateUsername = async (name) => {
  try {
    const { randomBytes } = await import('node:crypto');
    const id = randomBytes(2).toString('hex');
    return `${name.slice(0, 5)}${id}`;
  } catch (error) {
    console.error('Error importing crypto:', error);
    return null;
  }
};
