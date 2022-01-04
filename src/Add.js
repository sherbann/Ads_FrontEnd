import React, { useState } from "react";

function Add(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentAd) {
      result = props.client.updateAd(
        props.currentAd._id,
        e.target.adName.value,
        e.target.adLocation.value,
        e.target.summary.value,
        e.target.date.value
      );
    } else {
      result = props.client.addAd(e.target.adName.value, e.target.adLocation.value, e.target.summary.value, e.target.date.value);
    }
    result
      .then(() => {
        cDisabled(false);
        document.getElementById("addForm").reset();
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

      <form onSubmit={(e) => submitHandler(e)} id="addForm">
        Name: <br />
        <input
          type="text"
          defaultValue={props.currentAd?.name}
          name="adName"
          disabled={disabled}
        />
        <br />
        Location: <br />
        <input
          type="text"
          defaultValue={props.currentAd?.location}
          name="adLocation"
          disabled={disabled}
        />
        <br />
        Summary:
        <br />
        <input
          type="text"
          defaultValue={props.currentAd?.summary}
          name="summary"
          disabled={disabled}
        />
        <br />
        Date:
        <br />
        <input
          type="text"
          defaultValue={props.currentAd?.date}
          name="date"
          disabled={disabled}
        />
        <br />
        <br />
        <button type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
      </form>
    </>
  );
}

export default Add;
