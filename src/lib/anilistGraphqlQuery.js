export const watchListQuery = `
query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
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
