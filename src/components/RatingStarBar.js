import React from "react";

const RatingStarBar = props => {
    const universalOnChangeEventListener = e => {
        if(e.target.checked) {
            props.onRateChange(e.target.value);
        }
    };

    return (
        <span className="rating">
                <input id="rating5" type="radio" name="rating" value="rating5" onChange={universalOnChangeEventListener} />
                <label htmlFor="rating5">5</label>
                <input id="rating4" type="radio" name="rating" value="rating4" onChange={universalOnChangeEventListener} />
                <label htmlFor="rating4">4</label>
                <input id="rating3" type="radio" name="rating" value="rating3" onChange={universalOnChangeEventListener} />
                <label htmlFor="rating3">3</label>
                <input id="rating2" type="radio" name="rating" value="rating2" onChange={universalOnChangeEventListener} />
                <label htmlFor="rating2">2</label>
                <input id="rating1" type="radio" name="rating" value="rating1" onChange={universalOnChangeEventListener} />
                <label htmlFor="rating1">1</label>
            </span>
    );
};

export default RatingStarBar;
