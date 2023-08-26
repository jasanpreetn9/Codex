export const ssr = false

export const load = async () => {
    if (!import.meta.env.SSR) {
        // Check if continueWatching exists in local storage
        let objectStr = localStorage.getItem('continueWatching');

        if (!objectStr) {
            // If continueWatching doesn't exist, create it with a default value
            localStorage.setItem('continueWatching', JSON.stringify([]));
        } 
    }
}
