import React from "react";
import ExpertCard from "./ExpertCard";

const RateDetails = props => {
    const rate = JSON.parse(props.rate);
    let starsHtml = ExpertCard.generateStarRatingHtmlContent(rate.rate);

    return (
        <div>
            {starsHtml}
            <br />
            {rate.description + ` - `}<u>{rate.raterName}</u>
            <br />
            {rate.dateOfAdd}
        </div>
    );
};

export default RateDetails;
