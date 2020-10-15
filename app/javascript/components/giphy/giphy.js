import React, { useState } from 'react'
import Picker from 'react-giphy-component'

const Giphy = () => {
  const insertThing = (gif) => {
    let link = gif.original.url
    let wat = '<img style="height: 200px;" src="' + link + '"></img>'
    $('.election-form .vote-message').val(wat)
  }

  return (
    <div>
      <Picker apiKey={process.env.GIPHY_API_KEY} onSelected={insertThing.bind(this)} />
    </div>
  )
}

export default Giphy
