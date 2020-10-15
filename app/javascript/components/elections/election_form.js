import React, { useState, useEffect } from 'react'
import Giphy from '../giphy/giphy'

const ElectionForm = (props) => {
  const [nomineeId, setNomineeId] = useState('')
  const [writeIn, setWriteIn] = useState('')
  const [showWriteInInput, setShowWriteInInput] = useState(false)
  const [hasVoted, setHasVoted] = useState(props.has_voted)
  const [giphyVisible, setVisibility] = useState(false)

  const writeInOnChange = (e) => {
    setWriteIn(e.target.value)
  }

  const nomineeDropdownChange = (e) => {
    if (e.currentTarget.value == 'write_in') {
      setShowWriteInInput(true)
      setNomineeId(null)
    } else {
      setShowWriteInInput(false)
      setNomineeId(e.currentTarget.value)
      setWriteIn('')
    }
  }

  const handleSubmit = () => {
    $.ajax({
      url: props.post_url,
      type: 'POST',
      data: {
        vote: {
          election_id: props.election_id,
          nominee_id: nomineeId,
          write_in: writeIn,
          message: $('.election-form .vote-message').val()
        },
      },
      success: function () {
        setHasVoted(true)
        $('.election-form select').val('')
        $('.election-form .write-in-input').val('')
        $('.election-form .vote-message').val('')
      },
      error: function () {
        console.log('something went wrong')
      },
    })
  }

  return (
    <div className="election-form">
      <input type="hidden" className="election-id" value={ props.election_id } />
      <select onChange={ nomineeDropdownChange }>
        <option value="">Select...</option>
        { <NomineeDropdownOptions nominees={ props.nominees } /> }
        <option value="write_in">Write in your own answer!</option>
      </select>
      { showWriteInInput ? <WriteInInput onChange={ writeInOnChange } writeIn={ props.writeIn } /> : null }
      { giphyVisible ?
        <Giphy visible={giphyVisible} />
        : ''
      }
      <div class='tab'><button className="tablinks" onClick={ ()=>setVisibility(!giphyVisible) }>GIF</button></div>
      <div>
        { <NomineeMessage/> }
      </div>
      <button
        type="submit"
        className="btn right"
        onClick={ handleSubmit }
        disabled={ hasVoted }
      >
        Submit
      </button>
    </div>
  )
}

const NomineeDropdownOptions = (props) => (
  props.nominees.map((nominee) => {
    return (
      <option key={ nominee.id } value={ nominee.id } >
        {nominee.username}
      </option>
    )
  })
)

const WriteInInput = (props) => (
  <div className="write-in">
    <input
      className="write-in-input"
      placeholder="Write in..."
      type="text"
      name="name"
      value={ props.writeIn }
      onChange={ props.onChange }
    />
  </div>
)

const NomineeMessage = () => (
  <textarea
    className="vote-message"
    placeholder="Type something witty..."
    rows="4"
  />
)

export default ElectionForm
