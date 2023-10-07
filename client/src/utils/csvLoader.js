function parseCSV(string, delimiter = ',') {
  // Commented code in https://stackoverflow.com/questions/1293147/how-to-parse-csv-data
  const objPattern = new RegExp(
    '(\\' +
      delimiter +
      '|\\r?\\n|\\r|^)' + // Delimiters
      '(?:"([^"]*(?:""[^"]*)*)"|' + // Quoted fields
      '([^"\\' +
      delimiter +
      '\\r\\n]*))', // Standard fields
    'gi'
  )

  let arrData = [[]]
  let arrMatches = null

  while ((arrMatches = objPattern.exec(string))) {
    const strMatchedDelimiter = arrMatches[1]

    if (strMatchedDelimiter.length && strMatchedDelimiter !== delimiter) {
      arrData.push([])
    }

    let strMatchedValue
    if (arrMatches[2]) {
      strMatchedValue = arrMatches[2].replace(/""/g, '"')
    } else {
      strMatchedValue = arrMatches[3]
    }

    arrData[arrData.length - 1].push(strMatchedValue)
  }

  return arrData
}

function csvToObject(csvContent) {
  const props = csvContent[0]

  return csvContent
    .slice(1)
    .map((row) => row.reduce((acc, curr, idx) => ({ ...acc, [props[idx]]: curr }), {}))
}

function parseCollection(fileContent) {
  const csv = parseCSV(fileContent, ';')
  const collection = csvToObject(csv)
  return mapCollectionProps(collection)
}

function mapCollectionProps(collection) {
  const propsMap = {
    title: 'Nombre',
    artist: 'Artista',
    released: 'Lanzamiento',
    owned: 'Adquirido',
    favorite: 'Favoritos',
    topRS1: 'Top 500 (RS1)',
    topRS3: 'Top 500 (RS3)',
    discogs: 'Link Discogs',
    genre: 'Genero',
    wikipedia: 'Link Wikipedia',
    record_format: 'Formato',
    album_format: 'Formato vinilo',
    catalog_num: 'N Serie',
    edition: 'Edicion',
    country: 'Pais Edicion',
    label: 'Discografica',
    matrix: 'Matriz',
    condition: 'Estado',
    notes: 'Observaciones',
    jacket: 'Caratula',
    location: 'Ubicacion',
    nDisks: 'n discos'
  }

  return collection.map((entry) =>
    Object.entries(propsMap).reduce((acc, [key, value]) => {
      let propValue
      switch (key) {
        case 'released':
        case 'edition':
        case 'condition':
        case 'nDisks':
        case 'topRS1':
        case 'topRS3':
          propValue = entry[value] ? parseInt(entry[value]) : null
          break
        case 'owned':
        case 'favorite':
          propValue = !!parseInt(entry[value])
          break
        case 'wikipedia':
        case 'discogs':
        case 'jacket':
          propValue = entry[value] ? entry[value].slice(1, -1) : ''
          break
        case 'record_format': {
          propValue = parseRecordFormat(entry[value])
          break
        }
        case 'genre': {
          propValue = parseGenre(entry[value])
          break
        }
        default:
          if (typeof entry[value] === 'string') propValue = entry[value].trim()
          else propValue = entry[value]
      }

      return { ...acc, [key]: propValue }
    }, {})
  )
}

function parseGenre(value) {
  const genreRegex = [
    { genre: 'rock', regex: /(rock|punk|metal)/i },
    { genre: 'electronic', regex: /(electronic|house|dance|techno|electro|synth|new wave)/i },
    { genre: 'pop', regex: /(pop)/i },
    { genre: 'folk', regex: /(folk|country|bossa|flamenco|gospel|trova)/i },
    { genre: 'jazz', regex: /(jazz|swing)/i },
    { genre: 'funk', regex: /(funk|soul|blues|r&b)/i },
    { genre: 'classical', regex: /(classical|clasica)/i },
    { genre: 'hipHop', regex: /(hip hop|rap)/i },
    { genre: 'latin', regex: /(latin|bossa|flamenco|bachata|merengue|salsa)/i },
    { genre: 'stage', regex: /(stage|banda sonora|cine)/i },
    { genre: 'reggae', regex: /(reggae)/i },
    { genre: 'children', regex: /(children)/i },
    { genre: 'military', regex: /(militar|brass)/i }
  ]

  let genreArray = []
  genreRegex.forEach(({ genre, regex }) => {
    if (regex.test(value)) genreArray.push(genre)
  })

  const uniqueGenres = [...new Set(genreArray)]

  return uniqueGenres
}

function parseRecordFormat(value) {
  const formatRegex = [
    { format: 'vinyl', regex: /(vinil|vinyl)/i },
    { format: 'cd', regex: /(cd)/i },
    { format: 'cassette', regex: /(casete|cassette)/i }
  ]

  let formatArray = []
  formatRegex.forEach(({ format, regex }) => {
    if (regex.test(value)) formatArray.push(format)
  })

  return formatArray
}

export { parseCollection }
