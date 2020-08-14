import React from 'react'
import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
// use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
// const giphyFetch = new GiphyFetch(process.env.GIPHY_API_KEY)
const giphyFetch = new GiphyFetch('')
// configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
const fetchGifs = offset => giphyFetch.trending({ offset, limit: 10 });

const Giphy = () => {

  const insertThing = (gif) => {
    console.log(gif)
    let link = gif.original.url
    let wat = '<img style="height: 200px;" src="' + link + '"></img>'
    $('.election-form .vote-message').val(wat)
  }

  return (
    <div>
      <h3>holy frogs</h3>
      <Grid width={800} columns={3} fetchGifs={fetchGifs} />
    </div>
  )
}

export default Giphy
