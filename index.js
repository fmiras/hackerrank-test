const fetch = require('node-fetch')

const getAllTitles = async url => {
  let titles = []

  const firstResponse = await fetch(url)
  const { data, total_pages } = await firstResponse.json()
  titles.push(...data.map(movie => movie.Title))
  for (let i = 2; i <= total_pages; i++) {
    const response = await fetch(`${url}&page=${i}`)
    const json = await response.json()
    titles.push(...json.data.map(movie => movie.Title))
  }
  return titles
}

const getMovieTitles = async substring => {
  const url = `https://jsonmock.hackerrank.com/api/movies/search?Title=${substring}`
  let titles = await getAllTitles(url)
  titles.sort()
  return titles
}

(async () => {
  const titles = await getMovieTitles('spiderman')
  titles.forEach(title => console.log(title))
})()
