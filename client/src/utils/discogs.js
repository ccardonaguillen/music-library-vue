/*jshint esversion: 6 */

async function fetchRelease(release_id) {
  try {
    const response = await fetch(`https://api.discogs.com/releases/${release_id}`)
    const json = await response.json()

    return parseAlbum(json)
  } catch (e) {
    console.error('Error fetching release:', e)
    return null
  }
}

function parseAlbum(json) {
  const { title, artists, released, genres, formats, labels, year, country, uri } = json
  const genresMap = {
    Rock: 'rock',
    Electronic: 'electronic',
    Pop: 'pop',
    'Folk, World, & Country': 'folk',
    Jazz: 'jazz',
    'Funk / Soul': 'funk',
    Classical: 'classical',
    'Hip Hop': 'hipHop',
    Latin: 'latin',
    'Stage & Screen': 'stage',
    Reggae: 'reggae',
    Blues: 'blues',
    'Non-Music': 'nonMusic',
    "Children's": 'children',
    'Brass & Military': 'military'
  }

  return {
    title,
    artist: artists[0].name,
    released: parseInt(released.slice(0, 4)),
    genre: genres.map((genre) => genresMap[genre]),
    discogs: uri,
    record_format: formats[0].name ? [formats[0].name.toLowerCase()] : [],
    album_format:
      formats[0].descriptions.find((f) => ['LP', 'EP', 'Single'].includes(f)).toLowerCase() ?? null,
    catalog_num: labels[0].catno,
    edition: year,
    country,
    label: labels[0].name
    // jacket,
  }
}

export { fetchRelease }
