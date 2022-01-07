import React, { useState } from "react";
const createError = require('http-errors');


function Add(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentAd) {
      result = props.client.updateAd(
        props.currentAd._id,
        e.target.adEvent.value,
        e.target.adLocation.value,
        e.target.summary.value,
        e.target.date.value,
        e.target.time.value
      ); 
    } else {
      result = props.client.addAd(
        e.target.adEvent.value, 
        e.target.adLocation.value, 
        e.target.summary.value, 
        e.target.date.value, 
        e.target.time.value);
    }
    result
      .then(() => {
        cDisabled(false);
        document.getElementById("addForm").reset();
        /*document.getElementsByName("addForm").value = "";
        this.setState({ text: '' });*/
        props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };

  return (
    <>
      {props.currentAd ? "Update" : "Add"}
      <br />
      <br />
      <form onSubmit={(e) => submitHandler(e)} id="addForm">
        <br />
        <label for="comment">Event:</label>
        <br />
        <textarea
          type="text"
          defaultValue={props.currentAd?.event || ""}
          name="adEvent"
          disabled={disabled}
          cols={40}
          required="required"
          placeholder="Event name"
          class="form-control"
        />
        <br />
        Location: <br />
        <input
          type="text"
          defaultValue={props.currentAd?.location}
          name="adLocation"
          disabled={disabled}
          size="40"
          required="required"
        />
        <br />
        Summary:
        <br />
        <textarea
          type="text"
          defaultValue={props.currentAd?.summary || ""}
          name="summary"
          disabled={disabled}
          rows={4}
          cols={40}
          placeholder="A brief description of the event"
          required="required"
        />
        <br />
        Date:
        <br />

        <input
          type="date"
          defaultValue={props.currentAd?.date}
          name="date"
          disabled={disabled}
          placeholder="dd/mm/yyyy"
          size="100"
          required="required"
        />
        <br />
        Time:

        <br />
        <input
          type="time"
          defaultValue={props.currentAd?.time}
          name="time"
          disabled={disabled}
          placeholder="--:--"
          size="100"
          required="required"
        />
        <br />
        <br />
        <button className="buttonSubmit" type="submit" disabled={disabled} >
          {" "}
          Submit{" "}
        </button>
      </form>
    </>
  );
}

export default Add;
