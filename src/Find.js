import React, { useState } from "react";
const createError = require('http-errors');


function Add(props) {
    const [disabled, cDisabled] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        const searchParams = {
                sEvent: e.target.sEvent.value,
                sLocation:e.target.sLocation.value,
                minDate: e.target.dateMin.value,
                maxDate:e.target.dateMax.value,
        }
        props.querySearch(searchParams);
    };

    return (
        <>
            <br />
            <br />
            <form onSubmit={(e) => submitHandler(e)} id="findForm">
                <br />
                <label for="comment">Event:</label>
                <br />
                <textarea
                    type="text"
                    defaultValue={props.currentAd?.sEvent}
                    name="sEvent"
                    disabled={disabled}
                    cols={40}
                    placeholder="Event name"
                    class="form-control"
                />
                <br />
                Location: <br />
                <input
                    type="text"
                    defaultValue={props.currentAd?.sLocation ||""}
                    name="sLocation"
                    disabled={disabled}
                    size="40"
                />
                <br />
                First Date:
                <br />
                <input
                    type="date"
                    defaultValue={props.currentAd?.minDate}
                    name="dateMin"
                    disabled={disabled}
                />
                <br />
                Second Date:
                <br />
                <input
                    type="date"
                    defaultValue={props.currentAd?.maxDate}
                    name="dateMax"
                    disabled={disabled}
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
