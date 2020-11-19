import React, { useState } from 'react'
import Giphy from '../giphy/giphy'

const ElectionForm = (props) => {
  const [nomineeId, setNomineeId] = useState('')
  const [writeIn, setWriteIn] = useState('')
  const [showWriteInInput, setShowWriteInInput] = useState(false)
  const [giphyVisible, setVisibility] = useState(false)
  const [hasVoted, setHasVoted] = useState(props.has_voted)

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
        setHasVoted(false)
        console.log('something went wrong')
      },
    })
  }


  return (
    <div>
    { hasVoted
      ? ''
      : <div className="election-form">
          <form onSubmit={ handleSubmit }>
            <input type="hidden" className="election-id" value={ props.election_id } />

            <select name="nominees" id="nominees" onChange={ nomineeDropdownChange } required={true}>
              <option label="Select..." value=""></option>
              { <NomineeDropdownOptions nominees={ props.nominees } /> }
              <option value="write_in">Write in your own answer!</option>
            </select>

            { showWriteInInput ? <WriteInInput onChange={ writeInOnChange } writeIn={ props.writeIn } /> : null }
            { giphyVisible ?
              <Giphy visible={giphyVisible} />
              : ''
            }
            <div className='tab'><div className="tablinks" onClick={ ()=>setVisibility(!giphyVisible) }>GIF</div></div>
            { <NomineeMessage /> }
            <button
              type="submit"
              className="btn right"
              disabled={ hasVoted }
            >
              Submit
            </button>
          </form>
        </div>
    }
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
