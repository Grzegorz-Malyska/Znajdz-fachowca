import React from "react";

const FaqEntry = props => {
    return (
        <div className="item">
            <a data-toggle="collapse" data-parent="#pb_faq" href={"#pb_faq" + props.index} aria-expanded="true"
               aria-controls={"pb_faq" + props.index} className="pb_font-22 py-4">{props.question}</a>
            <div id={"pb_faq" + props.index} className="collapse show" role="tabpanel">
                <div className="py-3">
                    <p>{props.answer}</p>
                </div>
            </div>
        </div>
    );
};

export default FaqEntry;
