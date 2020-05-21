import React from 'react';
import ReactDOM from 'react-dom';

const ElectionForm = (props) => {
  let [showWriteInInput, setShowWriteInInput] = React.useState(false);
  let onChange = (e) => {
    if(e.currentTarget.value == 'Write in your own answer!'){
      setShowWriteInInput(true)
    } else {
      setShowWriteInInput(false);
    }
  }
  let nomineeDropdown = props.nominees.map((nominee) => {
    return <option key={nominee.id}>{nominee.username}</option>;
  });
  let handleSubmit = () => {
    $(".vote-message").val("");
    $.ajax({
      url: props.post_url,
      type: "POST",
      data: {
        vote: {
          election_id: props.election_id,
          nominee_id: 1,
          // write_in_name: 'bar',
          message: 'matt stinks',
        }
      },
      success: function (data) {
        alert('working')
      },
      error: function (data) {
        console.log("something went wrong");
      },
    })
  }

  return (
    <div className='election-form'>
      <input type="hidden" className='election-id' value={props.election_id}></input>
      <select onChange={onChange}>
        {nomineeDropdown}
          <option>Write in your own answer!</option>
      </select>
      {showWriteInInput ? <WriteInInput /> : null}
      <textarea className='vote-message' placeholder='Type something witty...' rows='4'></textarea>
      <button type="submit" className='btn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

const WriteInInput = () => (
  <div className="write-in">
    <input className="write-in-input" placeholder="Write in..."></input>
  </div>
);

// ReactDOM.render(
//   <ElectionForm nominees={props.nominees} />,
//   document.querySelector(".election-form")
// );

export default ElectionForm;