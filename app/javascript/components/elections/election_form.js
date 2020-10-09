import React from 'react'
import ReactDOM from 'react-dom'
import Giphy from '../giphy/giphy'

const ElectionForm = (props) => {
  const [nomineeId, setNomineeId] = React.useState('')
  const [writeIn, setWriteIn] = React.useState('')
  const [showWriteInInput, setShowWriteInInput] = React.useState(false)
  const [hasVoted, setHasVoted] = React.useState(props.has_voted)

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
      success: function (data) {
        setHasVoted(true)
        $('.election-form select').val('')
        $('.election-form .write-in-input').val('')
        $('.election-form .vote-message').val('')
      },
      error: function (data) {
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

      { <Giphy /> }
      <div class='tab'><button class="tablinks">GIF</button></div>
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

const NomineeMessage = (props) => (
  <textarea
    className="vote-message"
    placeholder="Type something witty..."
    rows="4"
  />
)

export default ElectionForm
// ReactDOM.render(<ElectionForm />, $('.election-form'))
