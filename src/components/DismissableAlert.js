import React from "react";
import { UncontrolledAlert } from "reactstrap";

const DismissableAlert = props => {
    if(props.dismiss !== undefined && props.dismissCallback !== undefined) {
        setTimeout(props.dismissCallback, props.dismiss * 1000);
    }

    return (
        <UncontrolledAlert color="info">
            {props.content}
        </UncontrolledAlert>
    );
};

export default DismissableAlert;
