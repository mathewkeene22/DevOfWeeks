import React from 'react'
import ReactDOM from 'react-dom'

const PokerTableForm = (props) => {
  const [bidValue, setbidValue] = React.useState('')

  const bidDropdownChange  = (e) => {
    setbidValue(e.currentTarget.value)
  };

  const handleSubmit = () => {
    $.ajax({
      url: '/poker_tables/update_bid',
      type: 'POST',
      data: {
        poker_table: {
          bid: bidValue
        },
      },
      success: function (data) {
      },
      error: function (data) {
        console.log('something went wrong')
      },
    })
  }

  const showBids = () => {
    $.ajax({
      url: '/poker_tables/flip_cards',
      type: 'POST',
      data: {
        show_cards: true
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
    <div className="row">
      <div className="col s6">
        <button className="btn" onClick={showBids}>
          Flip Cards
        </button>
        <button className="btn" onClick={clearAll}>
          Clear All
        </button>
      </div>
      <div className="col s6">
        <div className="form-inner-wrapper">
          <button type="submit" className="btn right" onClick={handleSubmit}>
            Submit
          </button>
          <select onChange={bidDropdownChange}>
            <option value="">Select...</option>
            <option value="1">1 - 1hr</option>
            <option value="2">2 - 2hrs - 3hrs</option>
            <option value="3">3 - 4hrs</option>
            <option value="4">4 - 6hrs</option>
            <option value="5">5 - 8hrs (whole day)</option>
            <option value="6">6 - More than one day</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default PokerTableForm