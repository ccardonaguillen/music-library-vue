/*jshint esversion: 6 */

async function fetchRelease(release_id) {
  try {
    const response = await fetch(`https://api.discogs.com/releases/${release_id}`)
    const json = await response.json()

    return parseAlbum(json)
  } catch (e) {
    return null
  }
}

function parseAlbum(json) {
  const { id, title, artists, released, genres, formats, labels, year, country } = json

  return {
    title,
    artist: artists[0].name,
    released: parseInt(released.slice(0, 4)),
    genre: genres[0],
    discogs: 'https://www.discogs.com/es/release/' + id,
    record_format: formats[0].descriptions.filter((f) => ['LP', 'EP', 'Single'].includes(f)),
    album_format: formats[0].name,
    catalog_num: labels[0].catno,
    edition: year,
    country,
    label: labels[0].name
    // jacket,
  }
}

export { fetchRelease }
