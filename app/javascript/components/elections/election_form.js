import React from 'react'
import ReactDOM from 'react-dom'

const ElectionForm = (props) => {
  const [nomineeId, setNomineeId] = React.useState('')
  const [writeIn, setWriteIn] = React.useState('')
  const [showWriteInInput, setShowWriteInInput] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [hasVoted, setHasVoted] = React.useState(props.has_voted)

  const writeInOnChange = (e) => {
    setWriteIn(e.target.value)
  }

  const messageOnChange = (e) => {
    setMessage(e.target.value)
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
          message: message,
        },
      },
      success: function (data) {
        alert('working')
        setHasVoted(true)
        $('.vote-message').val('')
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
        { <NomineeDropdownOptions nominees={props.nominees} /> }
        <option value="write_in">Write in your own answer!</option>
      </select>

      { showWriteInInput ? <WriteInInput onChange={ writeInOnChange } writeIn={ props.writeIn } /> : null }

      { <NomineeMessage onChange={ messageOnChange } message={ message } /> }
      <button
        type="submit"
        className="btn"
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
      <option key={ nominee.id } value={ nominee.id }>
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
    value={ props.message }
    onChange={ props.onChange }
  />
)

export default ElectionForm
// ReactDOM.render(<ElectionForm />, $('.election-form'))