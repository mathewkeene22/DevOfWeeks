import React from 'react'
import ReactDOM from 'react-dom'

const PokerTableForm = (props) => {
  const handleSubmit = () => {
    $.ajax({
      url: '/poker_tables/update_bid',
      type: 'POST',
      data: {
        poker_table: {
          bid: 2
        },
      },
      success: function (data) {
      },
      error: function (data) {
        console.log('something went wrong')
      },
    })
  }

  const clearAll = () => {
    $.ajax({
      url: '/poker_tables/clear_bids',
      type: 'POST',
      success: function (data) {
      },
      error: function (data) {
        console.log('something went wrong')
      },
    })
  }


  return (
    <div>
      <button
      className="btn right"
      onClick={ clearAll }
      >
        Clear All
      </button>
      <select>
        <option value="">Select...</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>

      <button
        type="submit"
        className="btn right"
        onClick={ handleSubmit }
      >
        Submit
      </button>

    </div>

  )
}

export default PokerTableForm
// ReactDOM.render(<PokerTableForm />, $('.election-form'))