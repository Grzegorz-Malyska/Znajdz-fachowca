import React from "react";
import axios from "axios";

class ExpertPrivateMessage extends React.Component {
    state = {
        deletingSuccessMessage: null,
        deletingErrorMessage: null
    };

    deleteMessageAction = e => {
        e.preventDefault();
        let message = JSON.parse(this.props.message);

        axios.post("http://localhost:8080/api/expert/message/" + this.props.expertName, message)
            .then(() => {
                this.props.onPrivateMessageDismiss(this.props.message);
            })
            .catch(err => {
                if(err.response.status !== 404) {
                    alert("Błąd krytyczny aplikacji!");
                }
            });
    };

    render() {
        let message = JSON.parse(this.props.message);

        return (
            <div>
                <li className="list-group-item">
                    <p>{message.content}</p>
                    <u><b>{message.senderName}</b></u>
                    <button onClick={this.deleteMessageAction} className="btn btn-secondary" type="button">Usuń</button>
                </li>
            </div>
        );
    }
}

export default ExpertPrivateMessage;
