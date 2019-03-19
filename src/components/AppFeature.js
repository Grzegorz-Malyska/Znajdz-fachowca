import React from "react";

const AppFeature = props => {
    return (
        <div className="col-lg-4 col-md- col-sm-6">
            <div className="media d-block pb_feature-v1 text-left">
                <div className="pb_icon"><i className={props.featureIconClass + " icon pb_icon-gradient"} /></div>
                <div className="media-body">
                    <h5 className="mt-0 mb-3 heading">{props.featureName}</h5>
                    <p className="text-sans-serif">{props.featureDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default AppFeature;
