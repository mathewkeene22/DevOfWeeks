import React, { useState } from 'react'
import Picker from 'react-giphy-component'

const Giphy = () => {
  const insertGif = (gif) => {
    let imageElement = `<img style="height: 200px;" src="${gif.original.url}"></img>`
    $('.election-form .vote-message').val(imageElement)
  }

  return (
    <div className="giphy-picker-container">
      <Picker apiKey={process.env.GIPHY_API_KEY} onSelected={insertGif.bind(this)} />
    </div>
  )
}

export default Giphy
